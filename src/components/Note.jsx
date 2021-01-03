import React, { useState } from 'react';
import styled from 'styled-components';

import writeSvg from '../assets/image/writing.svg';
import checkSvg from '../assets/image/check.svg';
import { AddItem } from './shared';

const NoteWrapper = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 20px;
`;

const ChangeBtn = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.1s;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const СheckedBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  background: ${(props) => (props.active ? 'green' : 'none')};
  border: 1px solid gray;
  border-radius: 50%;
  opacity: 0.5;
  transition: 0.1s;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  img {
    width: 10px;
    height: 10px;
    opacity: ${(props) => (props.active ? '1' : '0')};
    transition: 0.1s;
  }
`;
const Item = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: 600;
  ${ChangeBtn} {
    visibility: hidden;
  }

  &:hover {
    ${ChangeBtn} {
      visibility: visible;
    }
    ${СheckedBtn} {
      img {
        opacity: 1;
      }
    }
  }
`;

function Note({
  title,
  color,
  items,
  onAddItem,
  onToggleCompited,
  onChangeTitle,
  onChangeTodo,
}) {
  const [changeTitleMod, setChangeTitleMod] = useState(false);
  const [changeTodoMod, setChangeTodoMod] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [value, setValue] = useState('');

  function handleTitleMod() {
    if (changeTitleMod && value.trim()) {
      onChangeTitle(value);
      setChangeTitleMod(false);
      setValue('');
      return;
    }
    setValue(title);
    setChangeTitleMod(true);
  }

  function handleTodoMod(id, inputValue) {
    if (changeTodoMod) {
      onChangeTodo(id, value);
      setChangeTodoMod(false);
      setTodoId(null);
      setValue('');
      return;
    }
    setValue(inputValue);
    setTodoId(id);
    setChangeTodoMod(true);
  }

  function handleValue(e) {
    setValue(e.target.value);
  }
  return (
    <NoteWrapper>
      <Title color={color}>
        {changeTitleMod ? (
          <input value={value} onChange={handleValue} />
        ) : (
          <span>{title}</span>
        )}
        <ChangeBtn onClick={handleTitleMod}>
          <img src={writeSvg} alt="Изменить названия" />
        </ChangeBtn>
      </Title>
      {items.length ? (
        items.map((item) => (
          <Item key={item.id}>
            <СheckedBtn
              active={item.complited}
              onClick={() => onToggleCompited(item.id)}
            >
              <img src={checkSvg} alt="ОТметить как сделанное" />
            </СheckedBtn>
            {item.id === todoId ? (
              <input value={value} onChange={handleValue} />
            ) : (
              <span>{item.text}</span>
            )}
            <ChangeBtn onClick={() => handleTodoMod(item.id, item.text)}>
              <img src={writeSvg} alt="Изменить названия" />
            </ChangeBtn>
          </Item>
        ))
      ) : (
        <h4>У вас еще нет задач</h4>
      )}
      <AddItem
        title="Добавить задачу"
        placeholder="Новая задача"
        onSubmit={onAddItem}
      />
    </NoteWrapper>
  );
}

export default Note;
