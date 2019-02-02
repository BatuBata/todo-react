import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';

import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  // get todos with laravel api
  componentDidMount() {
    axios.get('https://api-todo-laravel.herokuapp.com/api/todos')
    .then(res => this.setState({ todos: res.data.data }))
  }

  // get todos
  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/todos')
  //        .then(res => this.setState({ todos: res.data }))
  //       // .then(res => console.log(res.data));
  // }

  // Toggle Complete with api laravel
  markComplete = (id,e) => {
    var completed_status = e.target.checked ? 0 : 1;

    axios.put('https://api-todo-laravel.herokuapp.com/api/todo-update', {
      id: id,
      completed : completed_status 
    })
    .then(res => this.setState({ todos: this.state.todos.map(todo => {
                                        if(todo.id === id) {
                                          todo.completed = !todo.completed;
                                        }

                                        return todo;
                                        }) 
                              })
    );
  }

  // Toggle Complete
  // markComplete = (id) => {
  //   this.setState({ todos: this.state.todos.map(todo => {
  //       if(todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }

  //       return todo;
  //     }) 
  //   });
  // }

  // Delete todo with api laravel
  delTodo = (id) => {
    axios.delete(`https://api-todo-laravel.herokuapp.com/api/todo/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // Delete todo
  // delTodo = (id) => {
  //   axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
  //     .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  // }

  // Delete todo with api laravel
  // delTodo = (id) => {
  //   axios.delete(`http://localhost:8000/api/todo/${id}`)
  //     .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  // }

  // add Todo
  // addTodo = (title) => {
  //   axios.post('https://jsonplaceholder.typicode.com/todos', {
  //     title: title,
  //     completed: false,
  //   })
  //     .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  // }

  // add todo with api laravel
  addTodo = (title) => {
    axios.post('https://api-todo-laravel.herokuapp.com/api/todo', {
      title: title,
      completed: false,
    })
      // .then(res => this.setState({ todos: [...this.state.todos, res.data.data] }));
      .then(res => console.log(res));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo} 

                />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
