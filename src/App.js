import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


import AppStart from "./AppStart";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      errMess: null,
      userid: 5,
      loading: false
    }
  }


  getTodo = () => {
    this.setState({ todo: null, errMess: null, loading: true })

    setTimeout(() => {

      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response =>
          response.json()

        )
        .then((res) => {
          this.setState({ todo: res, loading: false });
        }).catch((err) => {
          this.setState({ errMess: "Api err", loading: false })
        })
    }, 2000);

  }


  updatePost = () => {
    const { userid } = this.state;
    fetch(`https://jsonplaceholder.typicode.com/posts/${userid}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))

  }


  deletePost = () => {
    const { userid } = this.state;
    fetch(`https://jsonplaceholder.typicode.com/posts/${userid}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch((err) => {
        console.log(err);
      })
  }

  getTodoById = () => {
    this.setState({ todo: null, errMess: null, loading: true })

    const { userid } = this.state;
    setTimeout(() => {

      fetch(`https://jsonplaceholder.typicode.com/todos/${userid}`)
        .then(response =>
          response.json()

        )
        .then((res) => {
          this.setState({ todo: res, loading: false });
        }).catch((err) => {
          this.setState({ errMess: "Api err", loading: false })
        })
    }, 1000);

  }


  postData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos",
      {
        method: "POST",
        body: JSON.stringify({
          userId: 1,
          title: "NEW TITLE",
          completed: false
        }),
        headers: {
          "Content-type": "application / json; charset = UTF - 8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch((err) => {
        console.log(err);
      })

  }

  render() {
    return (
      <div className="App">
        <div id="cover-spin"></div>
        <div className="pwa-feature-btns">

          <button className="add-button">Add to homescreen</button>
          <button className="enable-notification">Enable Notification</button>

        </div>

        <AppStart />


        {/* <button class="add-button">Add to home screen</button>
        <button class="enable-notification">Enable Notification</button>
        <h1>React- pwa - workbox</h1>
        <button onClick={() => this.getTodo()}> get req GetTodo</button>

        <input type="text" value={this.state.userId}
          onChange={e => this.setState({ userid: e.target.value })} />
        <button onClick={() => this.getTodoById()}>GetByID</button>
        <br />
        {
          this.state.loading && <h4>Loading... {window.navigator.onLine ? "(online)" : "(offline)"}</h4>
        }
        {
          this.state.errMess && this.state.errMess
        }
        {
          this.state.todo && (
            <div>
              <br />
              <br />
              <br />

              <h3> userid {this.state.todo.id}</h3>
              <h3> title {this.state.todo.title}</h3>
            </div>
          )
        }

        <hr />

        <button onClick={() => this.postData()}>Post</button>

        <br />
        <button onClick={() => this.deletePost()} >Delete Post Api</button>

        <hr />
 */}


      </div>
    );
  }
}

export default App;
