import React, { Component } from 'react';
import Login from './login';
import Register from './register';

class UsersPage extends Component {

    render() {
        const { login_or_register } = this.props.match.params;
        return (
            (login_or_register === 'login') ? <Login /> : (login_or_register === 'register') ? <Register /> : <div>Unknown</div>
        )
    }
}

export default UsersPage;