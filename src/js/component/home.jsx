import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [todo, setTodo] = useState('')
	const [listOfTodos, setListOfTodos] = useState([])


	const obtenerDatos = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/billferrabone')
    	.then((response) => response.json()) //lo transformamos en un json
    	.then((data) => setListOfTodos(data)) //lo guardamos en un objeto
	}

	useEffect( () => {
		obtenerDatos()
	}, [])

	const crearTodo = (e) => {
		const newTodo = {label: e.target.value , done: false}
		setTodo(newTodo)
	}

	const addTodo = () => {
		setListOfTodos([...listOfTodos, todo])
		setTodo('')
	}


	const subirDatos = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/billferrabone', {
      method: "PUT",
      body: JSON.stringify(listOfTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
	}
	useEffect( () => {
		subirDatos()
	}, [listOfTodos])

	let tareasPendientes = listOfTodos.length

	const deleteTodo = (itemPaBorrar) => {
		const newList = listOfTodos.filter( (item) => item !== itemPaBorrar)
		setListOfTodos(newList)
	}

	const deleteAllTodos = () => {
		setListOfTodos([])
	}

	return (<>
		<div className="container text-center w-50 bg-light text-dark mt-3">
			<form>
				<h1 className="p-1">FetchTodoApp</h1>
				<input type="text" className="bg-light m-2 " onChange={(e) => {crearTodo(e)}} />
				<button type="button" className="btn btn-outline btn-primary" onClick={addTodo}>Añadir tarea</button>
			</form>
			<ul className="list-group list-group-flush">
				{listOfTodos.map( (item, index) => <li key={index}>{item.label}<button className="btn-outline btn-primary float-end" onClick={() => {deleteTodo(item)}}>X</button></li>)}
			</ul>
			<button type="button" className="btn btn-outline btn-primary" onClick={deleteAllTodos}>Elimitar todas las tareas</button>
			<div>Te faltan por realizar {tareasPendientes} tareas</div>
		</div>
		
		</>
	);
};

export default Home;