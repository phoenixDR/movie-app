import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import ProcessApiResponse from '../utils/ProcessApiResponse';
import { Card, Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const requestData = {
            email: email,
            password: password
        };

        const request = new Request("v1/tokens/authentication", {
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
            const token = jsonData.authentication_token.token;
            login(token);
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
                                <Card.Title className="text-center mb-4">Login</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    {error && <Alert variant="danger">{error}</Alert>}
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

                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Submit
                                    </Button>
                                    <div className="mt-3 text-center">
                                        <a href="/register">Registration</a>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default LoginComponent;
