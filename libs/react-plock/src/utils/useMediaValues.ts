import { useState, useEffect } from 'react';

export function useMediaValues(
  medias: number[] | undefined,
  columns: number[],
  gap: number[]
) {
  const [values, setValues] = useState({ columns: 0, gap: 1 });

  useEffect(() => {
    if (!medias) {
      setValues({ columns: columns[0], gap: gap[0] });
      return;
    }

    const mediaQueries = medias.map((media) =>
      window.matchMedia(`(min-width: ${media}px)`)
    );

    const onSizeChange = () => {
      let matches = 0;

      mediaQueries.forEach((mediaQuery) => {
        if (mediaQuery.matches) {
          matches++;
        }
      });

      // Update Values
      const idx = Math.min(mediaQueries.length - 1, Math.max(0, matches));
      setValues({ columns: columns[idx], gap: gap[idx] });
    };

    // Initial Call
    onSizeChange();

    // Apply Listeners
    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener('change', onSizeChange);
    }

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener('change', onSizeChange);
      }
    };
  }, [medias, columns, gap]);

  return values;
}
