import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

const loginCard = {
    width: '500px',
    margin: '30px auto'
}

const Login = props => {
    return (
        <Card variant={'dark'} style={loginCard}>
            <Card.Header as="h4">Login: </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
                <p className="mt-4">
                    No Account? <Link to="/users/register">Register</Link>
                </p>
            </Card.Body>
        </Card>
    )
}

export default Login;