export interface PlockProps extends React.ComponentPropsWithoutRef<'div'> {
  gap?: string;
  debounce?: number;
  breakpoints?: Breakpoint[];
}

export interface Breakpoint {
  size: number;
  columns: number;
}
