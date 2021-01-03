import React, { useState } from 'react';
import styled from 'styled-components';
import { Dot } from './index';
import plusSvg from '../../assets/image/plus.svg';
import closeSvg from '../../assets/image/close.svg';

const Title = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-size: 14px;
  opacity: 0.5;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
  img {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  &:hover {
    opacity: 0.7;
  }
`;

const AddForm = styled.form`
  position: relative;
  width: 200px;
  margin-top: 20px;
  padding: 13px 5px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 2px gray;

  input {
    display: block;
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
    &:focus::placeholder {
      font-size: 0;
    }
  }
  button {
    border: none;
    width: 100%;
    padding: 5px 10px;
    border-radius: 3px;
    color: #fff;
    background: green;
    outline: none;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.6;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
  margin-bottom: 10px;
  ${Dot} {
    border: 1px solid gray;
    margin: 0 3px;
    cursor: pointer;
    transition: 0.1s;
    &.active {
      border: 2px solid gray;
      transform: translateY(-3px);
    }
    &:hover {
      box-shadow: 0 0 5px gray;
    }
  }
`;

const Close = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: gray;
  border-radius: 50%;
  text-align: center;
  opacity: 0.7;
  transition: 0.1s;
  cursor: pointer;
  img {
    width: 10px;
    height: 10px;
  }
  &:hover {
    opacity: 0.9;
  }
`;

const Error = styled.span`
  display: block;
  margin-bottom: 10px;
  color: red;
  font-size: 10px;
`;

function AddItem({ colors, onSubmit, title, placeholder }) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [activeColor, setActiveColor] = useState(0);
  const [error, setError] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleColor(id) {
    setActiveColor(id);
  }

  function onClose() {
    setIsVisible(false);
    setValue('');
    setError('');
    setActiveColor(0);
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    if (value.trim()) {
      onSubmit(value, colors && colors[activeColor]);
      onClose();
      return;
    }
    setError('Поле не может быть пустым');
  }
  return (
    <>
      <Title onClick={() => setIsVisible(true)}>
        <img src={plusSvg} alt="добавить папку" aria-hidden="true" />
        <span>{title}</span>
      </Title>
      {isVisible && (
        <AddForm onSubmit={handleSubmit}>
          <Close onClick={onClose}>
            <img src={closeSvg} alt="Закрыть форму" />
          </Close>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
          {error && <Error>{error}</Error>}
          <Row>
            {colors &&
              colors.map((color, index) => (
                <Dot
                  color={color}
                  size="16px"
                  key={index}
                  className={`${index === activeColor ? 'active' : ''}`}
                  onClick={() => handleColor(index)}
                />
              ))}
          </Row>
          <button>Добавить</button>
        </AddForm>
      )}
    </>
  );
}

export default AddItem;
