import React , { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './todo.css'

export function Todo (){

    const [inputValue , setInputValue] = useState('')
    const [todos , setTodos] = useState([])
    const firstRender  = useRef(true);
    
    const addTodo = (e) =>{
        e.preventDefault();
        
        if(inputValue.trim() === ''){
            alert('Please Enter Todo Value')
            return null
        }

        setTodos([
            ...todos,
            {
                text : inputValue,
                id : uuidv4(),
            }
        ])

        setInputValue('')
    }

    const removeTodo = (id) =>{
        setTodos(todos.filter((todo)=> todo.id !== id));
    }

    useEffect(()=>{
        if(firstRender.current){
            console.log('true')
            firstRender.current = false
        }

        else{
            console.log('false')
            localStorage.setItem('Todo' , JSON.stringify([...todos]));
        }
    },[todos])

    useEffect(()=>{
        if(localStorage.getItem('Todo') !== null){
            var newTodo = localStorage.getItem('Todo')
            setTodos(JSON.parse([...todos ,newTodo]))
        }
    },[])

    return(
        <div className='container'>
            <form onSubmit={addTodo}>
                <input type={'text'} value={inputValue} placeholder={'Enter Your Todo'} onChange={(e)=>setInputValue(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
            {
                todos.map((todo)=>(
                    <div>
                    <div key={todo.id} className='todo'>
                        <p>{todo.text}</p>
                        <i onClick={()=>removeTodo(todo.id)} className="fa-solid fa-trash-can"></i>
                    </div><br/>
                    </div>
                ))
            }
        </div>
    )
}