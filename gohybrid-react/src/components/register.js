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
            <Card className="usersCard" >
                <Card.Header> Register</Card.Header>
                <Card.Body>
                    <Form>

                        <Form.Group controlId="formFirstName">
                            <Form.Label for="exampleTextArea">First Name</Form.Label>
                            <Form.Control type="text" name="f_name" className="form-control" id="exampleTextArea" placeholder="First Name" onChange={() => this.handleFirstName} />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label for="exampleTextArea">Last Name</Form.Label>
                            <Form.Control type="text" name="l_name" className="form-control" id="exampleTextArea" placeholder="Last Name" onChange={() => this.handleLastName} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label for="exampleInputEmail1">Email address</Form.Label>
                            <Form.Control type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={() => this.handleEmail} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label for="exampleInputPassword1">Password</Form.Label>
                            <Form.Control type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={() => this.handlePassword} />
                        </Form.Group>

                        <Button className="btn btn-danger">Submit</Button>
                    </Form>
                    <p className="lead mt-4">Already have an account? <Link to="/users/login">Login Here</Link></p>
                </Card.Body>
            </Card >
        )
    }
}

export default Register;