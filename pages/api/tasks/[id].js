import connectDB from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } else if (req.method === 'PUT') {
    const { title } = req.body;
    const task = await Task.findById(id);
    task.title = title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.status(200).json(task);
  } else if (req.method === 'GET') {
    const task = await Task.findById(id);
    res.status(200).json(task);
  }
}
