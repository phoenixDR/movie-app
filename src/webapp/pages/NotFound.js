import React from 'react';
import { Container, Alert } from 'react-bootstrap';

function NotFound() {
    return (
        <Container>
            <Alert variant="danger" className="mt-4">
                <Alert.Heading>404 - Page Not Found</Alert.Heading>
                <p>
                    The page you are looking for does not exist.
                </p>
            </Alert>
        </Container>
    );
}

export default NotFound;
