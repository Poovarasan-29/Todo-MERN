import React, { useEffect, useState } from "react";
import ToDos from "./ToDos";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkEditClicked, setCheckEditClicked] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoID] = useState(null);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const res = await axios.get("https://todo-knf0.onrender.com/");
      setTodos(res.data);
    }
  }, []);

  const handleSubmit = async () => {
    const titleTrim = title.trim();
    const descriptionTrim = description.trim();
    if (titleTrim.length !== 0) {
      if (checkEditClicked === false) {
        const res = await axios.post("https://todo-knf0.onrender.com/add", {
          title: titleTrim,
          description: descriptionTrim,
        });
        if (res.data.success) {
          setTodos(res.data.todos);
        }
      } else {
        const res = await axios.put("https://todo-knf0.onrender.com/edit/" + todoId, {
          title: titleTrim,
          description: descriptionTrim,
        });
        if (res.data.updatedData == false)
          confirm("The Updated todo already deleted");

        setTodos(res.data.todos);
        setTodoID(null);
        setCheckEditClicked(false);
      }
      setTitle("");
      setDescription("");
    } else {
      alert("Todo can't be Empty");
    }
  };

  return (
    todos && (
      <div>
        <div className="d-flex p-3 gap-2 pb-4 justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control w-50"
            placeholder="Description(Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="btn btn-primary d-flex justify-content-center align-items-center ms-4"
            onClick={handleSubmit}
          >
            {checkEditClicked ? "UPDATE" : "ADD"}
          </button>
        </div>
        <ToDos
          todos={todos}
          setTitle={setTitle}
          setDescription={setDescription}
          setCheckEditClicked={setCheckEditClicked}
          setTodoID={setTodoID}
          setTodos={setTodos}
        />
      </div>
    )
  );
}
