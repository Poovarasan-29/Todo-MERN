import { useEffect, useRef, useState } from "react"
import "../styles/InputEnter.css"
import axios from "axios"

const InputEnter = ({ setTodos, setEditing, editing, itemAddedMessage, setItemAddedMessage, selectRef }) => {
  const inputRef = useRef("")
  const [btnDisable, setBtnDisable] = useState(false);
  useEffect(() => {
    inputRef.current.focus()
    inputRef.current.value = editing?.text || "";
  }, [editing])

  async function handleItemAddAndUpdate(e) {
    e.preventDefault();

    const text = inputRef.current.value.trim();
    if (text.length != 0) {
      setBtnDisable(true)
      try {
        let res;
        if (editing.isEditing) {
          res = await axios.put(import.meta.env.VITE_API_URL + `/item-text-update/${editing.id}`, {
            text,
          })
          setEditing({ isEditing: false })

        } else {
          res = await axios.post(import.meta.env.VITE_API_URL + '/add', {
            text,
            id: localStorage.getItem('userId')
          })
        }

        setItemAddedMessage({
          message: res?.data?.message,
          statusCode: res.status
        })

        // Retirve the todos
        const res2 = await axios.get(import.meta.env.VITE_API_URL + "/get-todos", {
          params: { userId: localStorage.getItem('userId'), isChecked: selectRef.current.value }
        });
        setTodos(res2?.data?.todos);

      } catch (error) {
        console.error(error.response.data.message)
      } finally {
        inputRef.current.value = "";
        setBtnDisable(false);
        setTimeout(() => {
          setItemAddedMessage(null);
        }, 2000)

      }
    }
  }


  function handleCancelBtn() {
    if (editing.isEditing) {
      setEditing({ isEditing: false })
    }
    inputRef.current.value = ""
  }


  async function handleFilter(e) {


    const selectedFilterValue = e.target.value;// false-unchecked , true-checked
    const res = await axios.get(import.meta.env.VITE_API_URL + "/get-todos", {
      params: { userId: localStorage.getItem('userId'), isChecked: selectedFilterValue }
    });
    setTodos(res?.data?.todos);
  }

  return (
    <div style={{ position: 'relative' }}>
      {
        itemAddedMessage &&
        <p className={`${[200, 201].includes(itemAddedMessage.statusCode) ? 'text-success' : 'text-danger'} m-0 item-add-msg`}>{itemAddedMessage?.message}</p>
      }
      <form onSubmit={handleItemAddAndUpdate}>
        <div className='input--addbtn'>
          <div className="input--cancel-container">
            <input type="text" ref={inputRef} className='enter-item-input' placeholder='Enter item' />
            <i className="bi bi-x cancel-btn" onClick={handleCancelBtn}></i>
          </div>

          {
            editing.isEditing ?
              <button className='add-btn btn btn-primary' disabled={btnDisable}>Update</button> :
              <button className='add-btn btn btn-primary' disabled={btnDisable}>Add</button>
          }

        </div>

        <select className="select" ref={selectRef} onChange={handleFilter} aria-label="Default select example">
          <option defaultValue={true}>All</option>
          <option value={true}>Checked</option>
          <option value={false}>Unchecked</option>
        </select>
      </form>
    </div>
  )
}

export default InputEnter