import { useEffect, useRef } from "react"
import "../styles/ListToDos.css"
import axios from "axios"
import { useTransition } from "react"
const ListToDos = ({ todos, setTodos, setEditing, setItemAddedMessage, selectRef }) => {
    const listRef = useRef(null)
    const [isPending, startTransition] = useTransition();

    async function getTodos() {
        const userId = localStorage.getItem('userId')

        startTransition(async () => {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/get-todos", {
                params: {
                    userId,
                    isChecked: selectRef.current.value || undefined
                }
            })
            setTodos(res?.data?.todos)
        })
    }
    useEffect(() => {
        getTodos()
    }, [])


    useEffect(() => {
        listRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [todos])

    async function handleUpadation(id, isChecked) {
        const res = await axios.put(import.meta.env.VITE_API_URL + `/todo-list-check-update/${id}`, { isChecked }, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        getTodos()
        setItemAddedMessage({
            message: res?.data?.message,
            statusCode: res.status
        })

        setTimeout(() => {
            setItemAddedMessage(null)
        }, 2000)

    }

    function handleEdit(id, text) {
        setEditing({ isEditing: true, id, text })
    }

    async function handleDelete(id) {
        const res = await axios.delete(import.meta.env.VITE_API_URL + `/todo-delete/${id}`);

        setItemAddedMessage({
            message: res?.data?.message,
            statusCode: res.status
        })
        getTodos()

        setTimeout(() => {
            setItemAddedMessage(null)
        }, 2000)

    }


    return (
        <div className='list-todos-container'>
            {
                isPending &&
                <div className="loading">
                    {isPending && <p>Loading..</p>}
                </div>
            }
            {
                todos?.length === 0 ?
                    <div className="loading">
                        <p>No Items</p>
                    </div> :
                    <ul className="custom-scrollbar" ref={listRef}>
                        {
                            todos.map((todo, i) => {

                                return <li key={i}>
                                    <div className="d-flex align-items-center">
                                        <input type="checkbox" checked={todo.isChecked} onChange={(e) => handleUpadation(todo._id, e.target.checked)} />
                                    </div>
                                    <p className={`${todo.isChecked ? 'text-decoration-line-through text-secondary' : ''} m-0 flex-grow-1`} >
                                        {todo.text}
                                    </p>
                                    <div className="edit--delete-btns">
                                        <i className="bi bi-pencil-square btn btn-outline-warning border-0"
                                            onClick={() => handleEdit(todo._id, todo.text)}
                                        ></i>
                                        <i className="bi bi-trash btn btn-outline-danger border-0"
                                            onClick={() => handleDelete(todo._id)}
                                        ></i>
                                    </div>
                                </li>

                            }
                            )
                        }
                    </ul>
            }
        </div>

    )
}

export default ListToDos