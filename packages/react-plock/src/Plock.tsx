import * as React from "react";

export function useMediaColumn(
  medias: number[] = [],
  columns: number | number[] = 4
) {
  const [index, setIndex] = React.useState(1);

  const mediaQueries = medias.map((media) =>
    window.matchMedia(`(min-width: ${media}px)`)
  );

  React.useEffect(() => {
    const onSizeChange = () => {
      let idx = 0;

      mediaQueries.forEach((mediaQuery) => {
        if (mediaQuery.matches) {
          idx++;
        }
      });

      if (Array.isArray(columns)) {
        setIndex(columns[Math.min(mediaQueries.length - 1, Math.max(0, idx))]);
      } else {
        setIndex(columns);
      }
    };

    // Initial Call
    onSizeChange();

    // Apply Listeners
    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", onSizeChange);
    }

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", onSizeChange);
      }
    };
  }, [mediaQueries]);

  return index;
}

export type MasonryProps<T> = {
  items: T[];
  render: (item: T, idx: number) => React.ReactNode;
  config?: {
    columns?: number | number[];
    media?: number[];
  };
};

export function Masonry<T>({
  items = [],
  render,
  config = {
    columns: [1, 2, 3, 4],
    media: [640, 768, 1024, 1280],
  },
}: MasonryProps<T>) {
  const columns = useMediaColumn(config.media, config.columns);
  const chunks = createChunks<T>(items, columns);
  const dataColumns = createDataColumns<T>(chunks, columns);

  return (
    <div
      style={{
        display: "grid",
        alignItems: "start",
        gridColumnGap: 24,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr)`,
      }}
    >
      {dataColumns.map((column, idx) => (
        <MasonryRow key={idx}>
          {column.map((item, idx) => render(item, idx))}
        </MasonryRow>
      ))}
    </div>
  );
}

export function MasonryRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        rowGap: 24,
        gridTemplateColumns: "minmax(0, 1fr)",
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
