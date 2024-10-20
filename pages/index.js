import { useState, useEffect } from 'react';
import TaskList from '../Components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleComplete = async (id) => {
    await fetch(`/api/tasks/${id}/complete`, { method: 'PUT' });
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskList tasks={tasks} handleDelete={handleDelete} handleComplete={handleComplete} />
    </div>
  );
}
