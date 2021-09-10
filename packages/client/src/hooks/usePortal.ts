import { useRef, useEffect } from 'react';

export function usePortal(
  target: HTMLElement | null,
  id: string,
  classes: string
): HTMLDivElement {
  const portalRef = useRef<HTMLDivElement>(null);
  const portal = setPortal(portalRef);

  function setPortal(
    portalRef: React.MutableRefObject<HTMLDivElement | null>
  ): HTMLDivElement {
    if (portalRef.current !== null) return portalRef.current;
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', id);
    portalDiv.setAttribute('class', classes);
    return (portalRef.current = portalDiv);
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
