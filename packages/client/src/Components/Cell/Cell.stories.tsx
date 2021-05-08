import React from 'react';
import { Story, Meta } from '@storybook/react';
import Cell, { CellProps } from './';

export default {
  title: 'Components/Board/Cell',
  component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 15,
};

const Stack: Story<CellProps> = (args) => (
  <React.Fragment>
    <Cell {...args} />
    <Cell {...args} children={15} />
    <Cell {...args} index={13} children={'free'} />
    <Cell {...args} children={15} checked={true} />
    <Cell
      {...args}
      children={15}
      checked={true}
      winner={true}
      disabled={true}
    />
  </React.Fragment>
);

export const Variants = Stack.bind({});
Variants.decorators = [
  (Story) => (
    <div style={{ display: 'flex' }}>
      <Story />
    </div>
  ),
];
