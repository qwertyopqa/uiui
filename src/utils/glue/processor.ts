import { Str } from './str';
import { Comment } from './comment';
import { Struct } from './struct';
import { Var } from './var';
import { Args } from './args';

type ProcData = {
  comments: Comment.List;
  structs: Var.List;
  vars: Var.List;
  code: string;
};
type UiUiPanelCfg = {
  type: 'panel';
  label: string;
  settings: {
    flow: 'col' | 'row';
  };
  children?: string[];
  value: Var.UiUi[];
};
type Uniform = {
  type: string;
  name: string;
  size: number;
};

function initData(raw: string): ProcData {
  let { comments, code } = Comment.process(raw);
  code = code.replace(/#if[\s\S]*?#endif/g, Str.ReplaceAllButNLs);
  code = code.replace(/#\w?.*/g, Str.ReplaceAllButNLs);
  const sDefs = Struct.parseDefinition(code);
  const vars = Var.parse(code);
  //
  const isUiUi = (c: Comment.I) => c.content.indexOf('@uiui') >= 0;
  const getUiUi = (st: number, en: number) =>
    Comment.findS(comments, st, en, isUiUi) ||
    Comment.findL(comments, st - 1, en, isUiUi) ||
    undefined;
  sDefs.forEach((s: Struct.I) => {
    s.uiui = getUiUi(s.pos.s.row, s.content.pos.s.row);
    s.properties.forEach((p: Struct.Prop.I) => {
      p.uiui = getUiUi(p.pos.s.row, p.pos.e.row);
    });
  });
  vars.forEach((v) => {
    v.uiuiInstruction = getUiUi(v.pos.s.row, v.pos.e.row);
  });
  //
  function injectIntoStruct(s: Var.I) {
    if ('uiuiInstruction' in s) return s;
    if ('pos' in s) {
      s.uiuiInstruction = getUiUi(s.pos.s.row, s.pos.e.row);
    } else {
      console.log('HERE');
      const sp = s as any;
      const refS = Struct.withName(sDefs, sp.type);
      if (refS.uiui) sp.uiuiInstruction = refS.uiui;
    }
    if (s.args) {
      s.args.forEach((a) => {
        if (typeof a === 'string') return;
        if ('subtype' in a) injectIntoStruct(a);
      });
    }
    return s;
  }
  const structs: Var.List = [];
  sDefs.forEach((s) => {
    Struct.parseDeclarations(code, s, sDefs).forEach((d) =>
      structs.push(injectIntoStruct(d))
    );
  });
  return { code, structs, vars, comments };
}

function parsePanelUiUiArgs(args: string): UiUiPanelCfg | undefined {
  const r =
    /@uiui:panel\s*(?<name>.+?)\s*((?<flow>[V|>])\s*)?(\[\s*(?<children>.*)\s*\])?$/m.exec(
      args
    );
  if (!r || !r.groups) return;
  const flow = r.groups.flow === '>' ? 'row' : 'col';
  return {
    type: 'panel',
    label: r.groups.name,
    settings: { flow },
    children: r.groups.children
      ? r.groups.children.replace(/\s/g, '').split(',')
      : [],
    value: [],
  };
}

function parseVarUiUiArgs(v: Var.I) {
  if (!v.uiuiInstruction) return;
  const r =
    /\s*@uiui:(?<type>\w*)\s*(?<label>.*?)\s*\(\s*(?<args>.*)\s*\)/.exec(
      v.uiuiInstruction
    );
  if (!r || !r.groups) {
    if (v.uiuiInstruction) {
      const rp = parsePanelUiUiArgs(v.uiuiInstruction);
      if (rp) v.uiui = rp;
    }
    return;
  }
  v.uiui = {
    type: r.groups.type,
    label: r.groups.label,
    args: r.groups.args.replace(/\s/g, '').split(','),
    value: [],
  };
  const t = v.type + (v.size > 1 ? `[${v.size}]` : '');
  v.replacement = `uniform ${t} ${v.name};`;
}

function getDeclaredPanels(comments: Comment.List) {
  const panels: { [key: string]: UiUiPanelCfg } = {};
  Comment.eachM(comments, (c) => {
    if (/@uiui/.test(c.content)) {
      const re = /(@uiui:panel.*)\n/g;
      let r;
      while ((r = re.exec(c.content))) {
        const panel = parsePanelUiUiArgs(r[1]);
        if (panel) panels[panel.label] = panel;
      }
    }
  });
  return panels;
}

function processPanels(comments: Comment.List, vars: Var.UiUiList) {
  const panels = getDeclaredPanels(comments);
  Object.keys(vars).forEach((k) => {
    if (vars[k].type === 'panel') {
      panels[k] = vars[k] as any as UiUiPanelCfg;
      delete vars[k];
    }
  });
  const revisePanelHierarchy = (p: UiUiPanelCfg) => {
    if (!p || !('children' in p)) return;
    (p.children || []).forEach((c) => {
      if (c in panels) {
        const cp = panels[c];
        delete panels[c];
        p.value.push(cp);
        revisePanelHierarchy(cp);
      } else if (c in vars) {
        p.value.push(vars[c]);
      }
    });
    delete p.children;
  };
  Object.keys(panels).forEach((name) => {
    revisePanelHierarchy(panels[name]);
  });
  return Object.keys(panels).map((name) => panels[name]);
}

function processStructReplacement(s: Var.I, vars: Var.List) {
  let code = '';
  const rs: string[] = [];
  const as: string[] = [];
  const uniforms: Uniform[] = [];
  if (s.uiuiInstruction) {
    vars.push(s);
    if (s.args) {
      s.args.forEach((a) => {
        if (typeof a === 'string') {
          as.push(a);
        } else {
          as.push(a.name);
          if (a.type === 'int' || a.type === 'float' || a.type === 'uint') {
            const t = a.type + (a.size > 1 ? `[${a.size}]` : '');
            rs.unshift(`uniform ${t} ${a.name};`);
            uniforms.push({ type: a.type, name: a.name, size: a.size });
            vars.push(a);
          } else {
            const d = processStructReplacement(a, vars);
            if (d.uniforms.length > 0) uniforms.push(...d.uniforms);
            if (d.code) rs.push(d.code + '\n');
          }
        }
      });
    }
    if (rs.length > 0) {
      const rss = rs.join('\n');
      const ass = as.join(',');
      code = `${rss}\n${s.type} ${s.name} = ${s.type}(${ass});`;
    }
  }
  return { code, uniforms };
}

export function processGlslCode(raw: string) {
  const data = initData(raw);
  const vars: Var.UiUiList = {};
  const uniforms: Uniform[] = [];
  const replacements: Str.Replacement[] = [];
  data.structs.forEach((s) => {
    const d = processStructReplacement(s, data.vars);
    if (d.code) {
      replacements.push({
        start: s.pos.s.off,
        end: s.pos.e.off,
        text: d.code,
      });
    }
    if (d.uniforms.length > 0) uniforms.push(...d.uniforms);
  });
  data.vars.forEach((v) => {
    parseVarUiUiArgs(v);
    if (v.uiui) {
      if (v.uiui.type === 'panel') {
        v.uiui.value = [];
        const c: string[] = [];
        if (v.args) {
          v.args.forEach((a) => {
            if (typeof a === 'object') c.push(a.name);
          });
        }
        v.uiui.children = c;
      } else {
        if (Array.isArray(v.value)) {
          v.uiui.value = v.value.map((val) => {
            if (val.type === Args.TYPE.NUMBER) return Number(val.value);
            throw new Error(
              `cannot have this value (${val.value}) inside a var to be transformed into a uiui`
            );
          });
        } else {
          v.uiui.value = Number(v.value);
        }
        v.uiui.settings = (v.uiui.args || []).map((a) => Number(a));
      }
      vars[v.name] = { id: v.name, ...v.uiui };
    }
    if (v.replacement) {
      if ('pos' in v) {
        uniforms.push({
          type: v.type,
          name: v.name,
          size: v.size,
        });
        replacements.push({
          start: v.pos.s.off,
          end: v.pos.e.off,
          text: v.replacement,
        });
      }
    }
  });
  //
  let code = raw;
  replacements
    .sort((a, b) => b.start - a.start)
    .forEach((r) => {
      code = Str.replace(code, r);
    });
  //
  return {
    uiui: processPanels(data.comments, vars),
    code,
    uniforms,
  };
}
