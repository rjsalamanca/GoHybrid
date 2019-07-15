import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';

import HomePage from './components/homePage';
import UsersPage from './components/usersPage';

import './App.css';

class App extends Component {
  state = {
    isLoggedIn: false
  }
  render() {
    const { isLoggedIn } = this.state
    return (
      <Router>
        <Nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">GoHybrid </Link>
          <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <Nav className="navbar-nav mr-auto">
              <Nav.Item className="nav-item active">
                <Link className="nav-link" to="/">Home<span className="sr-only"></span></Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link className="nav-link" to="/page2">Page2</Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Link className="nav-link" to="/page3">Page3</Link>
              </Nav.Item>
              {isLoggedIn === true ?
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to="/users">Profile</Link>
                </Nav.Item>
                : ''}
            </Nav>
          </div>

          <div className="navbar-collapse collapse" id="navbarColor03" >
            {isLoggedIn === true ?
              <Nav className="navbar-nav ml-auto">
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to="/users/logout">Logout</Link>
                </Nav.Item>
              </Nav>
              :
              <Nav className="navbar-nav ml-auto">
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to="/users/login">Login</Link>
                </Nav.Item>
                <Nav.Item className="nav-item my-2 my-lg-0">
                  <Link className="nav-link" to="/users/register">Register</Link>
                </Nav.Item>
              </Nav>
            }
          </div>
        </Nav>
        <Route path='/' exact component={HomePage} />
        <Route path='/users/:login_or_register?' component={UsersPage} />
      </Router >
    );
  }
}

export default App;
