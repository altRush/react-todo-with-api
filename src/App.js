import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// 'as Router' is giving an alias to imported BrowswerRouter
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

// import uuid from 'uuid'; // npm for generate auto unique key
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }));
  }

  //Toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // DELETE Todo
  // Filter out from the ones we are deleting (by evaluating/mapping the id)
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  // Add Todo
  addTodo = title => {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      //A router needs to wrap around the main app
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            {
              // Route path = "/" means go to the home or root
            }
            <Route
              exact // 'exact' means not showing in other routes
              path="/"
              render={props => (
                /* render = {} is drawing the objects in the route */
                <Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    delTodo={this.delTodo}
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                  />
                </Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
