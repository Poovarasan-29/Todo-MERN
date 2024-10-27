const createModel = require("../models/createModel");

exports.fetchTodosController = async (req, res) => {
  try {
    const todos = await createModel.find({});
    res.json(todos);
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

exports.createRouteRouter = async (req, res) => {
  const { title, description } = req.body;
  try {
    await createModel.create({ title, description });
    const todos = await createModel.find({});

    res.status(201).json({ success: true, todos });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

exports.editTodoController = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedTodo = await createModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    const todos = await createModel.find({});

    if (updatedTodo == null) res.json({ todos, updatedData: false });
    else res.json({ todos, updatedData: true });
  } catch (error) {
    res.json({ success: false });
  }
};

exports.deleteTodoController = async (req, res) => {
  const deletedTodo = await createModel.findByIdAndDelete(req.params.id);

  const todos = await createModel.find({});
  res.json(todos);
};
