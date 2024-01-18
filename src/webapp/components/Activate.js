import React, { useState, useRef, useEffect } from 'react';
import ProcessApiResponse from '../utils/ProcessApiResponse';
import { Card, Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";

const ActivateComponent = () => {
    const [token, setToken] = useState('');
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
            token: token
        };

        const request = new Request("v1/users/activated", {
            method: "PUT",
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
                setSuccess('You\'ve successfully activated your account. You can proceed to');
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
                        <Card style={{ width: '21rem' }}>
                            <Card.Body>
                                <Card.Title className="text-center mb-4">Account Activation</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {success && <Alert variant="success">{success} <Link to="/login">Login</Link> page.</Alert>}
                                    <Form.Group className="mb-3" controlId="formBasicToken">
                                        <Form.Label>Activation Token</Form.Label>
                                        <Form.Control type="text" placeholder="Enter token" value={token}
                                                      onChange={e => setToken(e.target.value)} />
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

export default ActivateComponent;
