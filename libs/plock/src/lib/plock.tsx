import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PlockProps {}

const StyledPlock = styled.div`
  color: pink;
`;

export function Plock(props: PlockProps) {
  return (
    <StyledPlock>
      <h1>Welcome to Plock!</h1>
    </StyledPlock>
  );
}

export default Plock;
