import React, { useState } from "react";

export const TodoList = () => {
    const [inputText, setinputText] = useState('')
    const [todos, setTodos] = useState([])
    console.log(todos.length)
    
    const handleOnChange = (event) => {
        setinputText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        setTodos((prevState) => ([...prevState, inputText]))
        setinputText('')
    }

    const handleRemove = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    }

    return (
        <div className="container">
            <form className="mb-3" onSubmit={handleSubmit}>
                <input value={inputText} onChange={handleOnChange} className="form-control form-control-lg"
                    type="text" placeholder="escribe tu tarea aqui" aria-label=".form-control-lg example" />
            </form>
            {todos.map((todo, index) => {
                return (
                    <div className="todoItem my-2" key={index}>
                        <div className="itemText">{todo}</div>
                        <i onClick={() => handleRemove(index)} className="far fa-times-circle fs-4 closeIcon"></i>
                    </div>
                )
            })}
            <div className="text-start fw-light mt-2">{todos.length} items left</div>           
        </div>
    )
}


