import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class UsersPage extends Component {

    login() {
        return (
            <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            // <div>
            //     <h1>login</h1>
            // </div>
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