import React, { Component } from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import { 
    Route,  
    Switch, 
    Redirect,
    BrowserRouter as Router, 
} from 'react-router-dom';
import UserLogin from './UserLogin.js';


const userIsSignedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <h2>Welcome to the ToDo App!</h2>
                </header>

                <Router>
                    <Switch>
                        <Route exact path='/' render={() =>
                            userIsSignedIn()
                                ? <TodoApp />
                                : <Redirect to='login' />
                        } />

                        <Route path='/login' component={UserLogin} />
                    </Switch>
                </Router>
            </div>
        );
    }
}


//will have Routes