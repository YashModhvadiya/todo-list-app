import React from 'react';

const TaskList = ({ tasks, handleDelete, handleComplete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => handleComplete(task._id)}>Complete</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
