import axios from "axios";
import React from "react";

export default function ToDos({
  todos,
  setTitle,
  setDescription,
  setCheckEditClicked,
  setTodoID,
  setTodos,
  setLoading,
}) {
  function editHandle(e) {
    const todoid = e.target.getAttribute("todoid");
    const index = e.target.getAttribute("index");
    const { title, description } = todos[index];
    setTitle(title);
    setDescription(description);
    setCheckEditClicked(true);
    setTodoID(todoid);
  }

  async function deleteHandle(e) {
    setLoading(true)
    const todoid = e.target.getAttribute("todoid");

    const res = await axios.delete(
      "https://todo-knf0.onrender.com/delete/" + todoid
    );
    setTodos(res.data);
    setLoading(false)
  }

  return (
    <div className=" d-flex flex-column w-100 container-sm">
      {todos.map((todo, index) => (
        <div
          className="to-do w-100 border px-3 py-1 d-flex justify-content-between mt-2 rounded"
          style={{ backgroundColor: "#E5E6E4" }}
          key={index}
        >
          <div className="d-flex flex-column justify-content-around">
            <h4 className="w-100 m-0">{todo.title}</h4>
            <p className="ps-3 m-0">{todo.description}</p>
          </div>
          <div className="d-flex flex-column gap-1">
            <button
              className="btn btn-warning p-1"
              onClick={editHandle}
              index={index}
              todoid={todo._id}
            >
              Edit
            </button>
            <button
              className="btn btn-danger p-1"
              onClick={deleteHandle}
              index={index}
              todoid={todo._id}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
