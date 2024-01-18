import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <Container fluid style={{ padding: '2rem', backgroundColor: '#f7f7f9', borderRadius: '.3rem' }}>
            <h1>Welcome to MovieApp</h1>
            <p>
                Explore the world of movies. Add, view, and manage your favorite movies here.
            </p>
        </Container>
    );
}

export default Home;
