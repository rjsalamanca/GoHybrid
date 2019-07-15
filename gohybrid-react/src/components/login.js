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

    // async componentDidMount() {
    //     await this.setState({
    //         isLoggedIn: this.props.isLoggedIn
    //     })
    // }

    login = async () => {
        const url = 'http://localhost:3000/users/login';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })

        const data = await response.json();
        return data;
    }

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
                        <Button variant="primary" onClick={(e) => this.login()}>
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