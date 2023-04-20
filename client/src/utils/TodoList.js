import React, { useContext } from 'react';

import { ChangeDate, MyContext } from '../App';

const TodoList = ({ todos, handleDelete, handleEdit }) => {
  return (
    <ul className="allTodos">
      {todos.map((t) => (
        <li className="singleTodo">
          <span className="todoText" key={t.id}>
            {t.todo}
          </span>
          <span className="todoText">{new Date(t.startTime).toLocaleTimeString()}</span>
          <span className="todoText">{new Date(t.endTime).toLocaleTimeString()}</span>

          <>
            <button onClick={() => handleEdit(t.id)}>Edit</button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
