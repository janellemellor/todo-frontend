import React, { Component } from 'react';
import { getTodoData } from './TodoAPI.js'
import request from 'superagent';
import AddTodo from './AddTodo.js';
 
export default class TodoApp extends Component {
    //set global state for todos here
        state = { 
        todos: [] 
        }
    
    //add componentDidMount and get Todo data
    async componentDidMount() {
        //get user data from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        //hit get route from API using deployed Heroku 
        const todoData = await getTodoData().set('Authorization', user.token);

        console.log(todoData.body);

        //Update state with todos from API
        this.setState({ todos: todoData.body })
    }


    //add handleClick function for new Todo
handleClick = async() => {
    const newTodo = {
        id: Math.random()*100,
        task: this.state.todoInput, 
        complete: false,
    };

    const user = JSON.parse(localStorage.getItem('user'));

    const newTodos = [...this.state.todos, newTodo];

    this.setState({ todos: newTodos });
    
     //call post route and update state with new todo item
    const data = await request.post(`https://cryptic-coast-58268.herokuapp.com/api/todos`, 
        { task: this.state.todoInput }).set('Authorization', user.token);
}

    //add  handleInput to store new todo input
handleInput = (e) => { this.setState({  todoInput: e.target.value})};


    render() {
        if(localStorage.getItem('user')) {
   
        return (
            <div>
                <header> 
                    <h2>To Do List!</h2>
                    <h3>Welcome  
                        {JSON.parse(localStorage.getItem('user')).email} 
                    </h3>
                </header>

                <main>
                    <div>
                        <AddTodo todoInput={ this.state.todoInput } handleClick={ this.handleClick } handleInput={ this.handleInput } />

                        { this.state.todos.map((todo) => <p style={{
                            textDecoration: todo.complete ? 'line-through' : 'none' }}

                        onClick={async () => {
                            const newTodos = this.state.todos.slice();
                            const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                            matchingTodo.complete = !todo.complete
                            const user = JSON.parse(localStorage.getItem('user'));

                            this.setState({ todos: newTodos });
                            const data = await request.put(`https://cryptic-coast-58268.herokuapp.com/api/todos/${todo.id}`, matchingTodo).set('Authorization', user.token);
                        }}
                            key={todo.id}>
                                {todo.task}
                        </p>
                        )}
                    </div>
                </main>       
            </div>
        )
    }
    }
}
