import * as React from 'react';
import styles from './GlobalLayer.module.scss';
let _singleton: HTMLElement | null = null;

export namespace UtilLayer {
  export function getSingleton() {
    return _singleton;
  }
  export function setRole(role: string) {
    if (_singleton === null) return;
    _singleton.setAttribute('role', role);
  }

  export function resetRole() {
    if (_singleton === null) return;
    _singleton.setAttribute('role', '');
  }
}

export function UiUiUtilLayer() {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    _singleton = ref.current;
  }, [ref]);
  return <div ref={ref} className={styles.utilLayer}></div>;
}
