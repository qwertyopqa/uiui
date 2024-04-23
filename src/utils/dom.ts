export const getDragabbleArea = (el: HTMLElement, container?: HTMLElement) => {
  if (!container) {
    container = el.parentElement as HTMLElement;
  }
  const cB = container.getBoundingClientRect();
  const eB = el.getBoundingClientRect();
  return {
    w: cB.width - eB.width,
    h: cB.height - eB.height,
    eB,
    cB,
  };
};

export const setElemPos = (el: HTMLElement, pos: { x: number; y: number }) => {
  el.style.left = `${pos.x}px`;
  el.style.top = `${pos.y}px`;
};
