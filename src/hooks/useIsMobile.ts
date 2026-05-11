import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;

const getInitial = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(QUERY).matches;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(getInitial);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
};

export default useIsMobile;
