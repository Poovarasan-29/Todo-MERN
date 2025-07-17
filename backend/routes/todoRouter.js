const express = require("express");
const {
  fetchTodos,
  addNewItem,
  todoListCheckUpdate,
  todoTextUpdate,
  todoDelete,
} = require("../controller/todoController");
const router = express.Router();

router.route("/get-todos").get(fetchTodos);
router.route("/add").post(addNewItem);
router.route("/todo-list-check-update/:id").put(todoListCheckUpdate);
router.route("/item-text-update/:id").put(todoTextUpdate);
router.route("/todo-delete/:id").delete(todoDelete);

module.exports = router;
