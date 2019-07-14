import React, { Component } from 'react';
import Login from './login';

class UsersPage extends Component {

    register() {
        return (
            <div>
                <h1>register</h1>
            </div>
        )
    }

    render() {
        const { login_or_register } = this.props.match.params;
        return (
            (login_or_register === 'login') ? <Login /> : (login_or_register === 'register') ? this.register() : <div>Unknown</div>
        )
    }
}

export default UsersPage;