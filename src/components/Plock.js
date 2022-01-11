import * as React from "react";

const uuid = () => Math.random().toString(36).substring(2, 12);

export function Plock({ children, className, style, nColumns = 3, gap = 10 }) {
  const [columns, setColumns] = React.useState(() => {
    return Array.from({ length: nColumns }, (e) => []);
  });

  React.useLayoutEffect(() => {
    const columnsElements = Array.from({ length: nColumns }, (e) => []);

    React.Children.forEach(children, (child, index) => {
      const key = uuid();
      const cloned = React.cloneElement(child, {
        ...child.props,
        key: key,
      });

      columnsElements[index % nColumns].push(cloned);
    });

    setColumns(columnsElements);
  }, [children, nColumns, setColumns]);

  const defaultStyles = {
    mainGrid: {
      display: "grid",
      gridTemplateColumns: `repeat(${nColumns}, 1fr)`,
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
