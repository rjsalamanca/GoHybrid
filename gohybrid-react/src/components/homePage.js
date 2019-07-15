import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        const { isLoggedIn } = this.props.user;
        return (
            <div>
                <h1>Logged In Status: {isLoggedIn.toString()}</h1>
            </div>
        )
    }
}

export default HomePage;