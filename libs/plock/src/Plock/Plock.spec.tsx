import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Plock } from './Plock';

test('should render without crashing', () => {
  render(<Plock data-testid="masonry" />);
  const element = screen.getByTestId('masonry');
  expect(element).toBeInTheDocument();
});

it('should render the children', () => {
  render(
    <Plock>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const element = screen.getByText('I am a child on plock!');
  expect(element).toBeInTheDocument();
});

it('should render two columns', () => {
  const breakpoints = [{ size: 0, columns: 2 }];
  render(<Plock breakpoints={breakpoints} />);
  const elements = screen.getAllByTestId('masonry-column');
  expect(elements).toHaveLength(2);
});

it('should render three columns', () => {
  const breakpoints = [{ size: 0, columns: 3 }];
  render(<Plock breakpoints={breakpoints} />);
  const elements = screen.getAllByTestId('masonry-column');
  expect(elements).toHaveLength(3);
});

it('should render ten columns', () => {
  const breakpoints = [{ size: 0, columns: 10 }];
  render(<Plock breakpoints={breakpoints} />);
  const elements = screen.getAllByTestId('masonry-column');
  expect(elements).toHaveLength(10);
});

it('should apply the correct gap by default', () => {
  render(<Plock data-testid="masonry" />);
  const element = screen.getByTestId('masonry');
  expect(element).toHaveStyle({ columnGap: '10px' });
});

it('should permit to override the default gap', () => {
  render(<Plock gap="1rem" data-testid="masonry" />);
  const element = screen.getByTestId('masonry');
  expect(element).toHaveStyle({ columnGap: '1rem' });
});

it('should be possible apply HTML attributes to the container', () => {
  render(
    <Plock
      className="bg-gray-100"
      style={{ margin: '1px solid black' }}
      data-testid="masonry"
    />
  );
  const element = screen.getByTestId('masonry');
  expect(element).toHaveClass('bg-gray-100');
  expect(element).toHaveStyle({ margin: '1px solid black' });
});
