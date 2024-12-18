import { useMemo } from 'react';

export function useGridStyles(columns: number, gap: number) {
  return useMemo(
    () => ({
      display: 'grid',
      alignItems: 'start',
      gridColumnGap: gap,
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    }),
    [columns, gap]
  );
}
