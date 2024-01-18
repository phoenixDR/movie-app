import React, { useState, useRef, useEffect } from 'react';
import ProcessApiResponse from '../utils/ProcessApiResponse';
import { Card, Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";

const RegisterComponent = () => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const requestData = {
            name: firstname+' '+lastname,
            email: email,
            password: password
        };

        const request = new Request("v1/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        setIsLoading(true);
        try {
            const response = await fetch(request);
            const jsonData = await ProcessApiResponse(response);
            if (jsonData.user.id > 0) {
                setSuccess('Congratulation, you\'ve successfully registered an account. ' +
                    'We sent you e-mail with activation token. You may activate it');
            }
            console.log(jsonData);
        } catch (error) {
            if (isMounted.current) {
                setError(error.message);
            }
        } finally {
            if (isMounted.current) {
                setIsLoading(false);
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row>
                <Col>
                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only"></span>
                            </Spinner>
                        </div>
                    ) : (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title className="text-center mb-4">Register</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {success && <Alert variant="success">{success}  <Link to="/activate">here</Link>.</Alert>}
                                    <Form.Group className="mb-3" controlId="formBasicFirstname">
                                        <Form.Label>Firstname</Form.Label>
                                        <Form.Control type="text" placeholder="Enter firstname" value={firstname}
                                                      onChange={e => setFirstname(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicLastname">
                                        <Form.Label>Lastname</Form.Label>
                                        <Form.Control type="text" placeholder="Enter lastname" value={lastname}
                                                      onChange={e => setLastname(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email}
                                                      onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" value={password}
                                                      onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterComponent;
