import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log("Request body:", req.body); // Verificar los datos enviados
    console.log("Task ID:", req.params.id); // Verificar el ID recibido

    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );

    if (!taskUpdated) {
      console.log("Task not found for update");
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task updated successfully:", taskUpdated);
    return res.json(taskUpdated);
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

