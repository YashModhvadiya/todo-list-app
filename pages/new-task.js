import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
