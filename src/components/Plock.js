import * as React from "react";

const uuid = () => Math.random().toString(36).substring(2, 12);

/**
 * Configuration for Plock.
 * This is a map of breakpoints to the number of columns to use for that breakpoint.
 *
 * const breakpoints = {
 *   sm: { size: 640, columns: 1 },
 *   md: { size: 768, columns: 2 },
 *   lg: { size: 1024, columns: 3 },
 *   xl: { size: 1280, columns: 4 },
 * };
 */

export function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export function Plock({ children, className, style, nColumns = 3, gap = 10 }) {
  const width = useWindowWidth();
  const [columns, setColumns] = React.useState([]);

  React.useLayoutEffect(() => {
    let columnsElements = [];

    if (typeof nColumns === "number") {
      columnsElements = Array.from({ length: nColumns }, (e) => []);
    } else {
      // TODO: this is not correctly working
      const closestWith = Object.keys(nColumns).reduce((prev, curr) => {
        const { size } = nColumns[curr];
        return Math.abs(size - width) < Math.abs(prev - width) ? size : prev;
      }, 0);

      const closest = Object.keys(nColumns).find(
        (key) => nColumns[key].size === closestWith
      );

      columnsElements = Array.from(
        { length: nColumns[closest].columns },
        (e) => []
      );
    }

    React.Children.forEach(children, (child, index) => {
      const key = uuid();
      const cloned = React.cloneElement(child, {
        ...child.props,
        key: key,
      });

      columnsElements[index % columnsElements.length].push(cloned);
    });

    setColumns(columnsElements);
  }, [children, nColumns, setColumns, width]);

  const defaultStyles = {
    mainGrid: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      columnGap: gap,
      alignItems: "start",
    },
    columnGrid: {
      display: "grid",
      gridTemplateColumns: "100%",
      rowGap: gap,
    },
  };

  return (
    <div
      data-testid="plock-container"
      className={className}
      style={{ style, ...defaultStyles.mainGrid }}
    >
      {columns.map((column, index) => {
        return (
          <div
            data-testid="plock-column"
            style={defaultStyles.columnGrid}
            key={index}
          >
            {column}
          </div>
        );
      })}
    </div>
  );
}
