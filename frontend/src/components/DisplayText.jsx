import "../styles/DisplayText.css"

const DisplayText = ({ userName }) => {
    return (
        <div className='todo-text'>
            <h1>To do List</h1>
            <p className="user-name">- {userName}</p>
        </div>
    )
}

export default DisplayText