import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/tasks/${id}`)
        .then((response) => response.json())
        .then((data) => setTitle(data.title));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
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
        placeholder="Edit Task"
        required
      />
      <button type="submit">Update Task</button>
    </form>
  );
}
