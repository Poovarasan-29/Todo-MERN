const express = require("express");
const {
  createRouteRouter,
  fetchTodosController,
  editTodoController,
  deleteTodoController,
} = require("../controller/createController");
const router = express.Router();

router.route("/").get(fetchTodosController);
router.route("/add").post(createRouteRouter);
router.route("/edit/:id").put(editTodoController);
router.route("/delete/:id").delete(deleteTodoController);

module.exports = router;
