import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async function listTask(req, res) {
  const method = req.method;
  const body = req.body;
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const newTask = new Task(body);
        console.log(newTask)
        const saveTask = await newTask.save();
        return res.status(201).json(saveTask);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    case "DELETE":
      try {

      } catch (error) {
        res.status(500).json({error: error.message})
      }

    default:
      return res.status(400).json({ Message: "This method is not supported" });
  }
}
