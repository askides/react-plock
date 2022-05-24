import styled from 'styled-components';

interface MasonryProps {
  columns: number;
  gap: string;
}

const Masonry = styled.div<MasonryProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: ${({ gap }) => gap};
  align-items: start;
`;

interface MasonryColumnProps {
  gap: string;
}

const MasonryColumn = styled.div<MasonryColumnProps>`
  display: grid;
  grid-template-columns: '100%';
  row-gap: ${({ gap }) => gap};
`;

export { Masonry, MasonryColumn };
