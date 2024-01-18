import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function AddMovie() {
    return (
        <Container>
            <h1 className="mt-4">Add a New Movie</h1>
            <Form>
                <Form.Group controlId="formMovieTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter movie title" />
                </Form.Group>
                <Form.Group controlId="formMovieYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="text" placeholder="Enter year" />
                </Form.Group>
                {/* Additional Fields */}
                <Button variant="primary" type="submit">Add Movie</Button>
            </Form>
        </Container>
    );
}

export default AddMovie;
