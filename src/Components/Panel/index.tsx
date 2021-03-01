import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React from 'react';

interface Props {
  children?: any;
  index: any;
  value: any;
}

function Panel(props: Props) {
  const { children, value, index } = props;

  return (
    <div
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
    >
      {
        <Box p={3}>
          <Container maxWidth="xs">{children}</Container>
        </Box>
      }
    </div>
  );
}

export default Panel;
