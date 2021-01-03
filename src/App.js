import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Sidebar, Note } from "./components";

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

const NoteContainer = styled.div`
  flex: 1 1 auto;
`;
function App() {
  const [todos, setTodos] = useState([]);
  const [todosNotes, setTodosNotes] = useState([]);
  const [listNotes, setListNotes] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const colors = ["#f0f", "#000", "#f00"];

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")) || []);
    setTodosNotes(JSON.parse(localStorage.getItem("todosNotes")) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (todos.length && todosNotes.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("todosNotes", JSON.stringify(todosNotes));
      setActiveItem((prev) => prev || todos[0]);
    }
  }, [todos, todosNotes]);

  useEffect(() => {
    if (!todos.length && !activeItem) return;
    const candidate = todosNotes.find((note) => note.todoId === activeItem.id);
    setListNotes(candidate ? candidate.list : []);
    setTodos((prev) =>
      prev.map((todo) => {
        todo.active = todo.id === activeItem.id;
        return todo;
      })
    );
  }, [activeItem, todosNotes]);

  function setActive(id) {
    if (!id) {
      return;
    }
    setActiveItem(todos.find((todo) => todo.id === id));
  }
  function addTodo(title, color) {
    const newTodo = {
      id: Date.now(),
      color,
      title,
    };
    setTodos([...todos, newTodo]);
  }

  function onAddItem(id, text) {
    setTodosNotes((prev) => {
      const candidate = prev.find((todo) => todo.todoId === id);
      const newTodos = [...prev];
      if (!candidate) {
        newTodos.push({
          todoId: id,
          list: [],
        });
      }
      newTodos.map((todo) => {
        if (todo.todoId === id) {
          todo.list.push({
            id: Date.now(),
            complited: false,
            text,
          });
        }
        return todo;
      });
      return newTodos;
    });
  }

  function toggleComplited(todoId, id) {
    setTodosNotes((prev) =>
      prev.map((todo) => {
        if (todo.todoId === todoId) {
          todo.list.map((t) => {
            if (t.id === id) t.complited = !t.complited;
            return t;
          });
        }
        return todo;
      })
    );
  }

  function changeTitle(todoId, title) {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          todo.title = title;
        }
        return todo;
      })
    );
  }

  function onChangeTodo(todoId, id, value) {
    todosNotes.map((todo) => {
      if (todo.todoId === todoId) {
        todo.list = todo.list.map((t) => {
          if (t.id === id) {
            t.text = value;
          }
          return t;
        });
      }
      return todo;
    });
  }
  return (
    <Container>
      <NotesWrapper>
        {loading ? (
          "АЗАЗАЗА..."
        ) : (
          <>
            {" "}
            <Sidebar
              items={todos}
              colors={colors}
              onAddItem={addTodo}
              setActive={setActive}
            />
            <NoteContainer>
              {listNotes && activeItem && (
                <Note
                  title={activeItem.title}
                  color={activeItem.color}
                  items={listNotes}
                  onAddItem={(text) => onAddItem(activeItem.id, text)}
                  onToggleCompited={(id) => toggleComplited(activeItem.id, id)}
                  onChangeTitle={(title) => changeTitle(activeItem.id, title)}
                  onChangeTodo={(id, value) =>
                    onChangeTodo(activeItem.id, id, value)
                  }
                />
              )}
            </NoteContainer>{" "}
          </>
        )}
      </NotesWrapper>
    </Container>
  );
}

export default App;
