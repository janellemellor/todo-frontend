import React, { Component } from 'react';
import { getTodoData } from './TodoAPI.js'
// import AddTodo from './AddTodo.js';
 
export default class TodoApp extends Component {
    //set global state for todos here
        state = { 
        storedTodos: [] 
    }
    
    //add componentDidMount and get Todo data
    async componentDidMount() {
        //hit get route from API using deployed Heroku 
        const todoData = await (getTodoData);

        console.log(todoData.body);

        //Update state with todos from API
        this.setState({ storedTodos: todoData.body })
    }


    //add handleClick function for new Todo
    //call post route and update state with new todo item

    //add  handleInput to store new todo input

    render() {
       

        return (
            <div>
                <header> To Do List!</header>

                <main>
                    <div>
                        {this.state.storedTodos.map(eachTodo =>
                            <p></p> )}
                    </div>

                </main>
                 {/* //map over todos 
        //onClick mark todo as complete and update state
        
        //call put route to update todo data */}
                
            </div>
        )
    }
}
