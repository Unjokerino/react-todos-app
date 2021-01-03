import React, { useState } from 'react';
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
  const [todos, setTodos] = useState([
    { id: 1, color: '#fff', title: 'Учеба' },
    { id: 2, color: '#000', title: 'Фронтенд' },
    { id: 3, color: '#f00', title: 'Личное' },
  ]);

  const colors = ['#fff', '#000', '#f00'];

  const [todosNotes, setTodosNotes] = useState([
    {
      id: 1,
      list: [{ id: 1, text: 'Закончить проект', complited: false }],
      todoId: 1,
    },
    {
      id: 2,
      list: [{ id: 2, text: 'Сделать домашнее задания', complited: false }],
      todoId: 1,
    },
    {
      id: 3,
      list: [{ id: 3, text: 'Сдать историю', complited: true }],
      todoId: 1,
    },
  ]);

  function addTodo(title, color) {
    const newTodo = {
      id: Date.now(),
      color,
      title,
    };
    setTodos([...todos, newTodo]);
  }
  return (
    <Container>
      <NotesWrapper>
        <Sidebar items={todos} colors={colors} onAddItem={addTodo} />
        <Note />
      </NotesWrapper>
    </Container>
  );
}

export default App;
