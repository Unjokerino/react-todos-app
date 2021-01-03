import React, { useState } from 'react';
import styled from 'styled-components';

import { List, AddItem } from './shared';

import menuSvg from '../assets/image/menu.svg';

const SidebarWrapper = styled.div`
  background: rgb(204, 206, 212);
  padding: 30px 15px;
  width: 160px;
`;

const ListItem = styled.div`
  margin-bottom: 20px;
`;

function Sidebar({}) {
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
    <SidebarWrapper>
      <ListItem>
        <List
          items={[
            {
              id: 1,
              icon: menuSvg,
              title: 'Все задачи',
            },
          ]}
        />
      </ListItem>
      <ListItem>
        <List items={todos} />
      </ListItem>
      <AddItem colors={colors} onSubmit={addTodo} />
    </SidebarWrapper>
  );
}

export default Sidebar;
