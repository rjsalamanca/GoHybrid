import React, { Component } from 'react';

class UsersPage extends Component {

    login() {
        return (
            <div>
                <h1>login</h1>
            </div>
        )
    }

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
            (login_or_register === 'login') ? this.login() : (login_or_register === 'register') ? this.register() : <div>Unknown</div>
        )
    }
}

export default UsersPage;