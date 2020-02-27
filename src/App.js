import React, { Component } from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import { 
    Route,  
    Switch,
    Link, 
    //may need to add redirect too
    BrowserRouter as Router, 
} from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/:storedTodos?" component={TodoApp} />

          </Switch>
          
        </div>
      </Router>
    )
  }
}


//will have Routes