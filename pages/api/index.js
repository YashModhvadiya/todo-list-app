import connectDB from '../../lib/mongodb';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
  }
}
