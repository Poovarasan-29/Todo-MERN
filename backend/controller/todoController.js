const mongoose = require("mongoose");
const TodoModel = require("../models/todoModel");
const UserModel = require("../models/userModel");

exports.fetchTodos = async (req, res) => {
  const { userId, isChecked } = req.query;

  // Convert string "true"/"false" to boolean if defined
  const isCheckedFilter =
    isChecked === "true" ? true : isChecked === "false" ? false : undefined;

  try {
    const user = await UserModel.findOne(
      { _id: userId },
      {
        password: 0,
        createdAt: 0,
      }
    ).populate({
      path: "todos",
      match: isCheckedFilter !== undefined ? { isChecked: isCheckedFilter } : {},
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Something error Retry!" });
  }
};

exports.addNewItem = async (req, res) => {
  const { text, id } = req.body;

  if (!text || !id) {
    return res.status(400).json({ message: "Text and User ID are required" });
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todo = new TodoModel({
      text: text.trim(),
      userId: id,
    });

    await todo.save();

    user.todos.push(todo._id);
    await user.save();

    return res.status(201).json({
      message: "Item created",
    });
  } catch (error) {
    console.error("Add New Item Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please retry!" });
  }
};

exports.todoListCheckUpdate = async (req, res) => {
  const id = req.params.id;
  const { isChecked } = req.body;

  if (typeof isChecked !== "boolean") {
    return res
      .status(400)
      .json({ message: "`isChecked` must be a boolean value." });
  }

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { isChecked },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo item not found." });
    }

    return res.status(200).json({
      message: `Item marked as ${isChecked ? "completed" : "not completed"}`,
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Check update failed:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please retry!" });
  }
};

exports.todoTextUpdate = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Text cannot be empty." });
  }

  try {
    const updated = await TodoModel.findByIdAndUpdate(
      id,
      { text: text.trim() },
      { new: true } // Return the updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found." });
    }

    return res
      .status(200)
      .json({ message: "Item updated successfully", todo: updated });
  } catch (error) {
    console.error("Text update failed:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please retry!" });
  }
};

exports.todoDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await TodoModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const user = await UserModel.findById(deleted.userId);

    if (user) {
      const index = user.todos.indexOf(id);
      if (index > -1) {
        user.todos.splice(index, 1);
        await user.save();
      }
    }

    return res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong, please retry!" });
  }
};
