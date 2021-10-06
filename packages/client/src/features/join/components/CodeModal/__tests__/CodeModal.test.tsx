import { fireEvent, render, screen } from '@testing-library/react';
import CodeModal from '..';
import userEvent from '@testing-library/user-event';

const setup = () => {
  render(<CodeModal open={true} onClose={() => {}} noPortal={true} />);

  const submit = screen.getByRole('button', {
    name: /join/i,
  });
  const input1 = screen.getByRole('textbox', {
    name: /code1/i,
  }) as HTMLInputElement;
  const input2 = screen.getByRole('textbox', {
    name: /code2/i,
  });
  const input3 = screen.getByRole('textbox', {
    name: /code3/i,
  });
  const input4 = screen.getByRole('textbox', {
    name: /code4/i,
  });

  return { submit, input1, input2, input3, input4 };
};

it('handles basic interaction', () => {
  const { submit, input1, input2, input3, input4 } = setup();
  expect(screen.getByText(/input room code/i)).toBeInTheDocument();
  expect(submit).toBeDisabled();

  expect(input1).toHaveFocus();
  expect(input1).not.toHaveValue();
  fireEvent.change(input1, { target: { value: 'A' } });
  expect(input1).toHaveValue('A');

  expect(input2).toHaveFocus();
  expect(input2).not.toHaveValue();
  fireEvent.change(input2, { target: { value: 'B' } });
  expect(input2).toHaveValue('B');

  expect(input3).toHaveFocus();
  expect(input3).not.toHaveValue();
  fireEvent.change(input3, { target: { value: 'C' } });
  expect(input3).toHaveValue('C');

  expect(input4).toHaveFocus();
  expect(input4).not.toHaveValue();
  fireEvent.change(input4, { target: { value: 'D' } });
  expect(input4).toHaveValue('D');

  expect(submit).toBeEnabled();
});

it('handles typing', () => {
  const { submit, input1, input2, input3, input4 } = setup();
  expect(submit).toBeDisabled();

  expect(input1).not.toHaveValue();
  expect(input2).not.toHaveValue();
  expect(input3).not.toHaveValue();
  expect(input4).not.toHaveValue();

  userEvent.type(input1, 'ABCD');

  expect(input1).toHaveValue('A');
  expect(input2).toHaveValue('B');
  expect(input3).toHaveValue('C');
  expect(input4).toHaveValue('D');

  expect(submit).toBeEnabled();
});

it('handles paste', () => {
  const { submit, input1, input2, input3, input4 } = setup();
  expect(submit).toBeDisabled();

  expect(input1).not.toHaveValue();
  expect(input2).not.toHaveValue();
  expect(input3).not.toHaveValue();
  expect(input4).not.toHaveValue();

  const eventInit = {
    clipboardData: { getData: () => 'ABCD' },
  } as MouseEventInit;

  userEvent.paste(input1, 'ABCD', eventInit);

  expect(input1).toHaveValue('A');
  expect(input2).toHaveValue('B');
  expect(input3).toHaveValue('C');
  expect(input4).toHaveValue('D');

  expect(submit).toBeEnabled();
});

it('handles backspace', () => {
  const { submit, input1, input2, input3, input4 } = setup();
  fireEvent.change(input1, { target: { value: 'A' } });
  fireEvent.change(input2, { target: { value: 'B' } });
  fireEvent.change(input3, { target: { value: 'C' } });
  fireEvent.change(input4, { target: { value: 'D' } });

  expect(input1).toHaveValue('A');
  expect(input2).toHaveValue('B');
  expect(input3).toHaveValue('C');
  expect(input4).toHaveValue('D');

  expect(submit).toBeEnabled();

  userEvent.type(input4, '{backspace}');
  expect(input4).not.toHaveValue();
  expect(input4).toHaveFocus();

  userEvent.type(input4, '{backspace}');
  expect(input3).not.toHaveValue();
  expect(input3).toHaveFocus();

  userEvent.type(input3, '{backspace}');
  expect(input2).not.toHaveValue();
  expect(input2).toHaveFocus();

  userEvent.type(input2, '{backspace}');
  expect(input1).not.toHaveValue();
  expect(input1).toHaveFocus();
});
