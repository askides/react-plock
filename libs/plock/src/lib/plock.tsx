import { uniqueId } from 'lodash';
import * as React from 'react';
import { useWindowWidth } from './use-window-width';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  gap?: number;
  debounce?: number;
  breakpoints?: Breakpoint[];
}

interface Breakpoint {
  size: number;
  columns: number;
}

const first = (breakpoints: Breakpoint[]): Breakpoint => {
  return breakpoints[0];
};

const last = (breakpoints: Breakpoint[]): Breakpoint => {
  return breakpoints[breakpoints.length - 1];
};

const sorted = (breakpoints: Breakpoint[]): Breakpoint[] => {
  return breakpoints.sort((a, b) => a.size - b.size);
};

const contained = (breakpoints: Breakpoint[], width: number): Breakpoint[] => {
  return breakpoints.filter((el) => el.size <= width);
};

const calculateColumns = (breakpoints: Breakpoint[], width: number) => {
  const sortedBp = sorted(breakpoints);
  const containedBp = contained(sortedBp, width);
  const { columns } =
    containedBp.length < 1 ? first(sortedBp) : last(containedBp);

  // ??? OMG THIS IS SO UGLY!
  return Array.from({ length: columns }, (e) => []) as unknown as [
    React.ReactElement[]
  ];
};

const DEFAULT_BREAKPOINTS = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1024, columns: 3 },
  { size: 1280, columns: 4 },
];

// interface MasonryProps {
//   columns: [];
//   gap: number;
// }

// const Masonry = styled.div<MasonryProps>`
//   display: 'grid';
//   grid-template-columns: 'repeat(${(props) => props.columns.length}, 1fr)';
//   column-gap: ${({ gap }) => gap};
//   align-items: 'start';
// `;

const Plock = ({
  children,
  gap = 10,
  debounce = 200,
  breakpoints = DEFAULT_BREAKPOINTS,
  ...props
}: Props) => {
  const width = useWindowWidth({ debounceMs: debounce });
  const [columns, setColumns] = React.useState<[React.ReactElement[]?]>([]);

  React.useLayoutEffect(() => {
    const calculated = calculateColumns(breakpoints, width);

    React.Children.forEach(children, (child, index) => {
      const key = uniqueId('plock-item-');

      if (React.isValidElement(child)) {
        const cloned = React.cloneElement(child, {
          ...child.props,
          key: key,
        });

        calculated[index % calculated.length].push(cloned);
      }
    });

    setColumns(calculated);
  }, [children, breakpoints, width]);

  const defaultStyles = {
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      columnGap: gap,
      alignItems: 'start',
    },
    columnGrid: {
      display: 'grid',
      gridTemplateColumns: '100%',
      rowGap: gap,
    },
  };

  return (
    <div {...props} style={{ ...props.style, ...defaultStyles.mainGrid }}>
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
};

export { Plock };
