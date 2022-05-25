interface MasonryProps extends React.ComponentPropsWithoutRef<'div'> {
  columns: number;
  gap: string;
  children: React.ReactNode;
}

const Masonry = ({ children, columns, gap, ...props }: MasonryProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        columnGap: gap,
        alignItems: 'start',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

interface MasonryColumnProps extends React.ComponentPropsWithoutRef<'div'> {
  gap: string;
  children: React.ReactNode;
}

const MasonryColumn = ({ children, gap, ...props }: MasonryColumnProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100%',
        rowGap: gap,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export { Masonry, MasonryColumn };
