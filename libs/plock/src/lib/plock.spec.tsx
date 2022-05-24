import { render } from '@testing-library/react';

import Plock from './plock';

describe('Plock', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Plock />);
    expect(baseElement).toBeTruthy();
  });
});
