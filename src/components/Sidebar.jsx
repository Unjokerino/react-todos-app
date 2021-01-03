import React from 'react';
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

function Sidebar({ items, colors, onAddItem, setActive }) {
  return (
    <SidebarWrapper>
      <ListItem>
        <List items={items} setActive={setActive} />
      </ListItem>
      <AddItem
        title="Добавить папку"
        placeholder="Новая папка..."
        colors={colors}
        onSubmit={onAddItem}
      />
    </SidebarWrapper>
  );
}

export default Sidebar;
