interface MasonryProps {
  columns: number;
  gap: string;
  children: React.ReactNode;
}

const Masonry = ({ children, columns, gap }: MasonryProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        columnGap: gap,
        alignItems: 'start',
      }}
    >
      {children}
    </div>
  );
};

interface MasonryColumnProps {
  gap: string;
  children: React.ReactNode;
}

const MasonryColumn = ({ children, gap }: MasonryColumnProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100%',
        rowGap: gap,
      }}
    >
      {children}
    </div>
  );
};

export { Masonry, MasonryColumn };
