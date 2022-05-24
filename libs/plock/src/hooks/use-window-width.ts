import { debounce } from 'lodash';
import * as React from 'react';
import { isBrowser } from '../utils';

interface Props {
  debounceMs: number;
}

export function useWindowWidth({ debounceMs }: Props): number | undefined {
  // Needs to match in case of SSR
  const [width, setWidth] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (isBrowser) {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      const debouncedHandleResize = debounce(handleResize, debounceMs);

      window.addEventListener('resize', debouncedHandleResize);

      handleResize();

      return () => window.removeEventListener('resize', debouncedHandleResize);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [debounceMs]);

  return width;
}
