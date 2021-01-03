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

function Sidebar({ items, colors, onAddItem }) {
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
        <List items={items} />
      </ListItem>
      <AddItem colors={colors} onSubmit={onAddItem} />
    </SidebarWrapper>
  );
}

export default Sidebar;
