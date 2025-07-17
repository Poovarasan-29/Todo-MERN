import InputEnter from './InputEnter'
import '../styles/TodoContainer.css'
import ListToDos from './ListToDos'
import { useState, useRef } from 'react';

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState({ isEditing: false })
    const [itemAddedMessage, setItemAddedMessage] = useState(null);
    const selectRef = useRef(null)


    return (
        <div className='todo-container'>
            <InputEnter
                setTodos={setTodos}
                editing={editing}
                setEditing={setEditing}
                itemAddedMessage={itemAddedMessage}
                setItemAddedMessage={setItemAddedMessage}
                selectRef={selectRef}
            />
            <ListToDos
                todos={todos}
                setTodos={setTodos}
                setEditing={setEditing}
                setItemAddedMessage={setItemAddedMessage}
                selectRef={selectRef}
            />
        </div>
    )
}

export default TodoContainer