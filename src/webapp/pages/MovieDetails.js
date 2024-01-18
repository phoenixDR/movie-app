import React from 'react';
import { Container, Button } from 'react-bootstrap';

function MovieDetails() {
    return (
        <Container>
            <h1 className="mt-4">Movie Details</h1>
            <p>Title: Example Movie Title</p>
            {/* More Movie Details */}
            <Button variant="danger">Delete Movie</Button>
        </Container>
    );
}

export default MovieDetails;
