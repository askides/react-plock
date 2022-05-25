import { Plock } from 'react-plock';
import styled from 'styled-components';

const random = (min = 300, max = 450) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomMaterialColor = () => {
  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const Tiled = styled.div<{ height: number; backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: 5em;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  color: #fff;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
`;

const Heading = styled.h1`
  margin: 0;
  color: #fff;
  font-family: 'Roboto', sans-serif;
`;

const HeroTitle = styled(Heading)`
  font-size: 4em;
  font-weight: 700;
`;

const HeroSubtitle = styled(Heading)`
  font-size: 2em;
  font-weight: 500;
`;

const MonoLink = styled.a`
  color: #fff;
  padding-top: 1rem;
  font-size: 1.2em;
  font-family: 'Roboto', monospace;
`;

const Container = styled.div`
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export function Tile({ children }: { children: React.ReactNode }) {
  const height = random();
  const backgroundColor = getRandomMaterialColor();
  return (
    <Tiled height={height} backgroundColor={backgroundColor}>
      {children}
    </Tiled>
  );
}

const breakpoints = [
  { size: 768, columns: 3 },
  { size: 1024, columns: 4 },
  { size: 1280, columns: 5 },
];

const App = () => {
  return (
    <Container>
      <Hero>
        <HeroTitle>React Plock</HeroTitle>
        <HeroSubtitle as="h2">
          Plock is a responsive masonry layout package for React
        </HeroSubtitle>
        <MonoLink
          target="_blank"
          href="https://github.com/itsrennyman/react-plock"
          rel="noopener noreferrer"
        >
          View On Github
        </MonoLink>
      </Hero>
      <Plock gap="10px" breakpoints={breakpoints}>
        {Array(101)
          .fill(0)
          .map((el, index) => (
            <Tile key={index}>{index}</Tile>
          ))}
      </Plock>
    </Container>
  );
};

export { App };
