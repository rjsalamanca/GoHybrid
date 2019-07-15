import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

class Register extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    }

    handleFirstName = (e) => { this.setState({ first_name: e.target.value }) }
    handleLastName = (e) => { this.setState({ last_name: e.target.value }) }
    handleEmail = (e) => { this.setState({ email: e.target.value }) }
    handlePassword = (e) => { this.setState({ password: e.target.value }) }

    render() {
        return (
            <Card className="usersCard" variant={"dark"}>
                <Card.Header as="h5">Register</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name: </Form.Label>
                            <Form.Control type="input" onChange={(e) => this.handleFirstName(e)} placeholder="Enter Your First Name" />

                            <Form.Label>Last Name: </Form.Label>
                            <Form.Control type="input" onChange={(e) => this.handleLastName(e)} placeholder="Enter Your Last Name" />

                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e) => this.handleEmail(e)} placeholder="Enter email" />

                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="on" type="password" onChange={(e) => this.handlePassword(e)} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary">
                            Submit
                        </Button>
                    </Form>
                    <p className="mt-4">
                        Already have an account? <Link to="/users/login">Login Here</Link>
                    </p>
                </Card.Body>

            </Card>
        )
    }
}

export default Register;