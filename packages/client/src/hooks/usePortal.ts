import { useRef, useEffect } from 'react';

export function usePortal(target: HTMLElement | null): HTMLDivElement {
  // lazy load portal
  const portalRef = useRef<HTMLDivElement | null>(null);

  const portal = setPortal(portalRef);

  function setPortal(
    portalRef: React.MutableRefObject<HTMLDivElement | null>
  ): HTMLDivElement {
    if (portalRef.current !== null) return portalRef.current;
    portalRef.current = document.createElement('div');
    return portalRef.current;
  }

  useEffect(() => {
    if (target === null) return;
    target.appendChild(portal);
    return function cleanup() {
      if (!target.contains(portal)) return;
      target.removeChild(portal);
    };
  }, [portal, target]);

  return portal;
}
