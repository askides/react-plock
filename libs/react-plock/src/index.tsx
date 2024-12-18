import React, { useState } from 'react';
import { createSafeArray } from './utils/createSafeArray';
import { useGridStyles } from './utils/useGridStyles';
import { useMediaValues } from './utils/useMediaValues';

export type MasonryProps<T> = React.ComponentPropsWithoutRef<'div'> & {
  items: T[];
  render: (item: T, idx: number) => React.ReactNode;
  config: {
    columns: number | number[];
    gap: number | number[];
    media?: number[];
    useBalancedLayout?: boolean;
  };
  as?: React.ElementType;
};

export function Masonry<T>({
  items = [],
  render,
  config,
  as: Component = 'div',
  ...rest
}: MasonryProps<T>) {
  const [heights, setHeights] = useState<Map<T, number>>(new Map());
  const { columns, gap } = useMediaValues(
    config.media,
    createSafeArray(config.columns),
    createSafeArray(config.gap)
  );

  const styles = useGridStyles(columns, gap);

  if (!columns) return null;

  // Choose layout strategy based on config
  const dataColumns = config.useBalancedLayout
    ? createBalancedColumns(items, columns, (item) => heights.get(item) ?? 0)
    : createDataColumns(createChunks(items, columns), columns);

  return (
    <Component {...rest} style={styles}>
      {dataColumns.map((column, columnIdx) => (
        <MasonryRow gap={gap} key={columnIdx}>
          {column.map((item, idx) => (
            <div
              key={idx}
              ref={(node) => {
                if (node && config.useBalancedLayout) {
                  const height = node.getBoundingClientRect().height;

                  if (heights.get(item) !== height) {
                    // Update heights state if changed, triggering re-render
                    setHeights((prev) => {
                      const next = new Map(prev);
                      next.set(item, height);
                      return next;
                    });
                  }
                }
              }}
            >
              {render(item, idx)}
            </div>
          ))}
        </MasonryRow>
      ))}
    </Component>
  );
}

export function MasonryRow({
  children,
  gap,
}: {
  children: React.ReactNode;
  gap: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        rowGap: gap,
        gridTemplateColumns: 'minmax(0, 1fr)',
      }}
    >
      {children}
    </div>
  );
}

export function createChunks<T>(data: T[] = [], columns = 3) {
  const result = [];

  for (let idx = 0; idx < data.length; idx += columns) {
    const slice = data.slice(idx, idx + columns);
    result.push(slice);
  }

  return result;
}

export function createDataColumns<T>(data: T[][] = [], columns = 3) {
  const result = Array.from<T[], T[]>({ length: columns }, () => []);

  for (let idx = 0; idx < columns; idx++) {
    for (let jdx = 0; jdx < data.length; jdx += 1) {
      if (data[jdx][idx]) {
        result[idx].push(data[jdx][idx]);
      }
    }
  }

  return result;
}

export function createBalancedColumns<T>(
  items: T[],
  columns: number,
  getHeight: (item: T) => number
): T[][] {
  const result = Array.from<T[], T[]>({ length: columns }, () => []);
  const columnHeights = new Array(columns).fill(0);

  // Maintain original order, but distribute to shortest column
  for (const item of items) {
    let shortestColumnIndex = 0;
    let minHeight = columnHeights[0];

    for (let i = 1; i < columns; i++) {
      if (columnHeights[i] < minHeight) {
        minHeight = columnHeights[i];
        shortestColumnIndex = i;
      }
    }

    result[shortestColumnIndex].push(item);
    columnHeights[shortestColumnIndex] += getHeight(item);
  }

  return result;
}
