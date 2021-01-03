import React from 'react';
import styled from 'styled-components';

import { Sidebar, Note } from './components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`;

const NotesWrapper = styled.div`
  display: flex;
  max-width: 800px;
  min-height: 500px;
  margin: 60px auto 0 auto;
  border-radius: 10px;
  box-shadow: 0px 2px 20px rgb(235, 235, 235);
`;

function App() {
  return (
    <Container>
      <NotesWrapper>
        <Sidebar />
        <Note />
      </NotesWrapper>
    </Container>
  );
}

export default App;
