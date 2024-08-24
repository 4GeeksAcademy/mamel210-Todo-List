import React, { useEffect, useState } from "react";

export const TodoListFetch = () => {
    const host = "https://playground.4geeks.com/todo"
    const agend = "mamel210"
    const [inputText, setinputText] = useState('')
    const [todos, setTodos] = useState([])
    console.log(todos.length)

    const handleOnChange = (event) => {
        setinputText(event.target.value)
    }

    const handleSubmit =  (event) => {
        event.preventDefault() 
        createData()       
        setinputText('')
    }

    const handleRemove = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    }

    const getTodos = async () => {
        const uri = `${host}/users/${agend}`
        const options = {
            method: 'GET'
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data.todos);
        setTodos(data.todos)
        return
    }

    const createData = async () => {
        const dataToSend = {
            label: inputText,
            is_done: false
        }
        const uri = host + '/todos/mamel210'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('error: ', response.status, response.statusText);
            return
        };
        const data = await response.json();
        getTodos()
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="container">
            <form className="mb-3" onSubmit={handleSubmit}>
                <input value={inputText} onChange={handleOnChange} className="form-control form-control-lg"
                    type="text" placeholder="escribe tu tarea aqui" aria-label=".form-control-lg example" />
            </form>
            {todos.map((todo, index) => {
                return (
                    <div className="todoItem my-2" key={index}>
                        <div className="itemText">{todo.label}</div>
                        <i onClick={() => handleRemove(index)} className="far fa-times-circle fs-4 closeIcon"></i>
                    </div>
                )
            })}
            <div className="text-start fw-light mt-2">{todos.length} items left</div>
        </div>
    )
}


