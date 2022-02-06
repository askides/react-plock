import * as React from "react";

/**
 * Configuration for Plock.
 * This is a map of breakpoints to the number of columns to use for that breakpoint.
 *
 * const breakpoints = [
 *   { size: 640, columns: 1 },
 *   { size: 768, columns: 2 },
 *   { size: 1024, columns: 3 },
 *   { size: 1280, columns: 4 },
 * ];
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

export const Plock = React.forwardRef(
  (
    { as: Comp = "div", children, className, style, nColumns = 3, gap = 10 },
    forwardedRef
  ) => {
    const width = useWindowWidth();
    const [columns, setColumns] = React.useState([]);

    React.useLayoutEffect(() => {
      let columnsElements = [];

      if (typeof nColumns === "number") {
        columnsElements = Array.from({ length: nColumns }, (e) => []);
      } else {
        let breakpoint = nColumns
          .filter((el) => el.size <= width)
          .sort((a, b) => a.size - b.size)
          .pop();

        if (!breakpoint) {
          breakpoint = nColumns.sort((a, b) => a.size - b.size)[0];
        }

        columnsElements = Array.from({ length: breakpoint.columns }, (e) => []);
      }

      React.Children.forEach(children, (child, index) => {
        const key = `item-${index}`;
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
      <Comp
        ref={forwardedRef}
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
      </Comp>
    );
  }
);
