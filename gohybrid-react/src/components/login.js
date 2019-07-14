import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

const loginCard = {
    width: '500px',
    margin: '30px auto'
}

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    handleEmail = (e) => { this.setState({ email: e.target.value }) }
    handlePassword = (e) => { this.setState({ password: e.target.value }) }

    render() {
        return (
            <Card variant={'dark'} style={loginCard}>
                <Card.Header as="h5">Login</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e) => this.handleEmail(e)} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="on" type="password" onChange={(e) => this.handlePassword(e)} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary">
                            Sign In
                        </Button>
                    </Form>
                    <p className="mt-4">
                        No Account? <Link to="/users/register">Register</Link>
                    </p>
                </Card.Body>
            </Card>
        )
    }
}

export default Login;