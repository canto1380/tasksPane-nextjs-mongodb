import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

export default async function queryID(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id)
        if(!task) return res.status(404).json({ msg: 'Task not found'})
        console.log(task)
        return res.status(200).json(task)
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
    case "PUT":
      try {
        const updateTask = await Task.findByIdAndUpdate(id, body, {new: true})
        if(!updateTask) return res.status(400).json({msg: 'Task not found'})
        return res.status(200).json(updateTask)
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
      break;
    case "DELETE":
      try {
        const deleteTask = await Task.findByIdAndDelete(id)
        if(!deleteTask) return res.status(400).json({msg: 'Task not found'})
        return res.status(204).json({message: 'Task deleted successfully'})
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
      break;

    default:
      return res.status(400).json({msg: 'This method is not supported'});
  }

}
