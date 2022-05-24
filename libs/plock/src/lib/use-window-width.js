import * as React from 'react';
import { useDebounce } from './use-debounce';
import { isBrowser } from './utils';

export function useWindowWidth({ debounceMs }) {
  const [width, setWidth] = React.useState(isBrowser ? window.innerWidth : 0);
  const handleResize = useDebounce(
    () => setWidth(isBrowser ? window.innerWidth : 0),
    debounceMs
  );

  React.useEffect(() => {
    if (isBrowser) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [handleResize]);

  return width;
}
