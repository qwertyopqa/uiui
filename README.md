# UiUi

[![NPM](https://img.shields.io/npm/v/@opqa/uiui.svg)](https://www.npmjs.com/package/@opqa/uiui)
[![npm](https://img.shields.io/npm/dm/@opqa/uiui.svg)](https://www.npmjs.com/package/@opqa/uiui)
![GitHub](https://img.shields.io/github/license/qwertyopqa/uiui)

UiUi aims to provide the most minimalistic + small yet readable Gui.
It's highly dependent on glslcv a minimalistic implementation of 2D GLSL shader code into a canvas element.

What it does:
- Creates a GUI based on a config file, and calls back any state update.
- Parses a GLSL shader file w/ UiUi comments and displays it.

You can check it [Here](https://uiui-examples.vercel.app/)


It should/will support:
- extendable component (you should be able to define new components)
- component replacement (you can define a new slider codebase for the component type 'slider')
- theming

## Install
Unfortunatelly this proj is still highly dependent on the [react-typescript-library template](https://github.com/alioguzhan/react-typescript-library). So yarn...
```bash
yarn add uiui
```

## Usage

You can check the 'example' folder. But in basic terms:

@SomeReactTag.tsx
```tsx

  import { UiUi } from '@opqa/uiui';
  ...
  // Import a UiUi config file
  const uiuiData = require('{DATA-URL}.json');
  return (<UiUi.Root data={uiuiData}/>)
  ...
  // or, frag-shader (a-la-shadertoy) with UiUiComments
  return (<UiUi.Canvas url="{SHADER-URL}.glsl" />)

```

You can check the [Examples Json File](https://github.com/qwertyopqa/uiui-examples/blob/main/src/UiUi.testdata.b.json)
+ the UiUiComment Structure on a [sample shader](https://github.com/qwertyopqa/uiui-examples/blob/main/public/shader.frag.glsl)


## API / Props
TBC

## License
MIT © [Goncalo Tavares](https://github.com/qwertyopqa)
