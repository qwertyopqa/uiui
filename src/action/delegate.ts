import { setElemPos, getDragabbleArea } from '../utils/dom';
import { limit } from '../utils/numbers';
import { UtilLayer } from '../ui/utils/GlobalLayer';

type QuickRectInfo = {
  t: number;
  r: number;
  b: number;
  l: number;
  w: number;
  h: number;
};
type EventInfo = QuickRectInfo & {
  pos: {
    x: number;
    y: number;
  };
  ori: {
    x: number;
    y: number;
  };
};

function brInfo(el: HTMLElement): QuickRectInfo {
  const {
    top: t,
    left: l,
    bottom: b,
    right: r,
    width: w,
    height: h,
  } = el.getBoundingClientRect();
  return { t, l, b, r, w, h };
}

function getInfo(el: HTMLElement, p: { x: number; y: number }): EventInfo {
  const { t, l, b, r, w, h } = brInfo(el);
  return Object.assign(
    { t, l, b, r, w, h },
    {
      pos: { x: p.x - l, y: p.y - t },
      ori: p,
    }
  );
}

export const DragDelegate = (tgt: HTMLElement, sets: any) => {
  const process = (el: HTMLElement, ev: MouseEvent, type: string) => {
    ev.preventDefault();
    const info = getInfo(el, { x: ev.clientX, y: ev.clientY });
    if (sets[type]) sets[type](info);
    if (sets.all) sets.all(info, type);
  };
  const onDrag = (ev: MouseEvent) => {
    if (!sets.dragging && !sets.all) return;
    process(tgt, ev, 'dragging');
  };
  const onRelease = (ev: MouseEvent) => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onRelease);
    if (!sets.released && !sets.all) return;
    process(tgt, ev, 'released');
  };
  tgt.onmousedown = (ev: MouseEvent) => {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onRelease);
    if (!sets.pressed && !sets.all) return;
    process(tgt, ev, 'pressed');
  };
};

export const DragOnParentDelegate = (tgt: HTMLElement, sets: any) => {
  const parent: HTMLElement = tgt.parentElement as HTMLElement;
  DragDelegate(tgt, {
    all: (info: EventInfo, type: string) => {
      if (type === 'pressed') {
        UtilLayer.setRole('dragging');
      } else if (type === 'released') {
        UtilLayer.resetRole();
      }
      const s = { w: info.w, h: info.h };
      if (!sets.elementCenter) {
        sets.elementCenter = { x: s.w / 2, y: s.h / 2 }; // We're assumning the center of the obj is it's absolute center
      }
      const area = getDragabbleArea(tgt, parent);
      const pp = {
        x: info.ori.x - area.cB.left - sets.elementCenter.x,
        y: info.ori.y - area.cB.top - sets.elementCenter.y,
      };
      const nInfo = info as any;
      nInfo.normalized = {
        x: limit(pp.x / area.w),
        y: limit(pp.y / area.h),
      };
      nInfo.constrained = {
        x: nInfo.normalized.x * area.w,
        y: nInfo.normalized.y * area.h,
      };
      if (!sets.dontSetPos) {
        setElemPos(tgt, nInfo.constrained); // dunno ... should we delagate this at all?
      }
      if (sets[type]) sets[type](nInfo);
      if (sets.all) sets.all(nInfo, type);
    },
  });
};
