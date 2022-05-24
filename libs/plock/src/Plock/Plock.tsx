import { uniqueId } from 'lodash';
import * as React from 'react';
import { useWindowWidth } from '../hooks/use-window-width';
import { Masonry, MasonryColumn } from '../Masonry';
import { Breakpoint, PlockProps } from './Plock.types';

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

const Plock = ({
  children,
  gap = '10px',
  debounce = 200,
  breakpoints = DEFAULT_BREAKPOINTS,
  ...props
}: PlockProps) => {
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

  return (
    <Masonry columns={columns.length} gap={gap} {...props}>
      {columns.map((column, index) => {
        return (
          <MasonryColumn gap={gap} key={index} data-testid="masonry-column">
            {column}
          </MasonryColumn>
        );
      })}
    </Masonry>
  );
};

export { Plock };
