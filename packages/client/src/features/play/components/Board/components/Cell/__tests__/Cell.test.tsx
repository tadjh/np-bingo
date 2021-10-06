import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cell from '..';

it('Handles basic cell interaction', () => {
  render(
    <Cell key="cell-1" winner={false}>
      5
    </Cell>
  );

  const cell = screen.getByText(/5/i);

  userEvent.click(cell);

  expect(screen.queryByTestId('crossmark')).toBeInTheDocument();

  userEvent.click(cell);

  expect(screen.queryByTestId('crossmark')).not.toBeInTheDocument();
});

it('handles double clicks', () => {
  render(
    <Cell key="cell-1" winner={false}>
      5
    </Cell>
  );

  userEvent.dblClick(screen.getByText(/5/i));

  expect(screen.queryByTestId('crossmark')).not.toBeInTheDocument();
});

it('handles double clicks after a single click', () => {
  render(
    <Cell key="cell-1" winner={false}>
      5
    </Cell>
  );

  const cell = screen.getByText(/5/i);

  userEvent.click(cell);

  expect(screen.queryByTestId('crossmark')).toBeInTheDocument();

  userEvent.dblClick(cell);

  expect(screen.queryByTestId('crossmark')).toBeInTheDocument();
});
