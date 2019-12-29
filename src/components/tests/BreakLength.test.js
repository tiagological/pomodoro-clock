import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BreakLength from '../BreakLength';

afterEach(cleanup);

it('displays break length correctly', () => {
  const { getByTestId } = render(<BreakLength amount={5} />);

  expect(getByTestId('break-amount')).toHaveTextContent(5);
});
