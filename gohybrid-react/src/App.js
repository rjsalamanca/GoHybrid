import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/homePage';
import UsersPage from './components/usersPage';
import './App.css';

function App() {
  return (
    <Router>
      <Route path='/' exact component={HomePage} />
      <Route path='/users/:login_or_register?' component={UsersPage} />
    </Router>
  );
}

export default App;
