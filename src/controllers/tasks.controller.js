// GET /tasks
export const getTasks = (req, res) => {
  res.send('Aquí se listarán las tareas');
};

// POST /tasks
export const createTask = (req, res) => {
  res.send('Aquí se creará una tarea');
};
