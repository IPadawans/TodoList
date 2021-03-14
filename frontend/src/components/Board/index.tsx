import React from 'react';

import List from '../List';

import { Container } from './styles';

const Board: React.FC = () => {
  return (
    <Container>
      <List name="TODO" useOutOfTasks />
      <List name="CONCLUDED" />
    </Container>
  );
};

export default Board;
