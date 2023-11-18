import React from 'react';
import { memo, useEffect, useMemo, useReducer, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

const KeepAlive = (props: { include: Array<string>; keys: any }) => {
  const outlet = useOutlet();
  const { include, keys } = props;
  const { pathname } = useLocation();
  const componentList = useRef(new Map());
  // @ts-ignore
  const forceUpdate = useReducer((bool) => !bool)[1]; // 强制渲染
  const cacheKey = useMemo(() => pathname + '__' + keys[pathname], [pathname, keys]);
  const activeKey = useRef<string>('');
  useEffect(() => {
    componentList.current.forEach(function (_value, key) {
      const _key = key.split('__')[0];
      if (!include.includes(_key) || _key === pathname) {
        // @ts-ignore
        this.delete(key);
      }
    }, componentList.current);
    activeKey.current = cacheKey;
    if (!componentList.current.has(activeKey.current)) {
      componentList.current.set(activeKey.current, outlet);
    }
    forceUpdate();
  }, [cacheKey, include]); // eslint-disable-line
  return (
    <>
      {Array.from(componentList.current).map(([key, component]) => (
        <React.Fragment key={key}>
          {key === activeKey.current ? (
            <React.Fragment>{component}</React.Fragment>
          ) : (
            <div style={{ display: 'none' }}>{component}</div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default memo(KeepAlive);
