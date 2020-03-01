import React, { Component } from 'react';
import { getTodoData } from './TodoAPI.js'
import request from 'superagent';
import AddTodo from './AddTodo.js';
 
export default class TodoApp extends Component {
    //set global state for todos here
        state = { 
        storedTodos: [] 
    }
    
    //add componentDidMount and get Todo data
    async componentDidMount() {
        //hit get route from API using deployed Heroku 
        const todoData = await getTodoData();

        console.log(todoData.body);

        //Update state with todos from API
        this.setState({ storedTodos: todoData.body })
    }


    //add handleClick function for new Todo
handleClick = async() => {
    const newTodo = {
        id: Math.random()*100,
        task: this.state.todoInput, 
        complete: false,
    };

    const newTodos = [...this.state.todos, newTodo];

    this.setStaate({ todos: newTodos });
    
     //call post route and update state with new todo item
    const data = await request.post(`https://cryptic-coast-58268.herokuapp.com/api/todos`, 
        { task: this.state.todoInput })
}

    //add  handleInput to store new todo input
handleInput = (e) => { this.setState({  todoInput: e.target.value})};


    render() {
       

        return (
            <div>
                <header> To Do List!</header>

                <main>
                    <div>
                        <AddTodo todoInput={ this.state.todoInput } handleClick={ this.handleClick } handleInput={ this.handleInput } />

                        
                    </div>

                </main>
               
                
            </div>
        )
    }
}
