import { Plock } from 'react-plock';
import styled from 'styled-components';

const StyledApp = styled.div`
  // Your style here
`;

const random = (min = 300, max = 450) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function Tile({ children }: { children: React.ReactNode }) {
  const height = random();
  return <div style={{ height, background: '#d49d9d' }}>{children}</div>;
}

export function App() {
  return (
    <StyledApp>
      <Plock gap={10}>
        {Array(101)
          .fill(0)
          .map((el, index) => (
            <Tile key={index}>{index}</Tile>
          ))}
      </Plock>
    </StyledApp>
  );
}

export default App;
