import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { AuthProvider } from './components/AuthContext';
import { PublicRoute } from './components/PublicRoute';
import ToastComponent from './components/ToastComponent';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Activate from './pages/Activate';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import AddMovie from './pages/AddMovie';
import NotFound from './pages/NotFound';

function App() {
  return (
      <>
          <AuthProvider>
            <NavBar />
            <ToastComponent />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/activate" element={<PublicRoute><Activate /></PublicRoute>} />
                <Route path="/movies" element={<MovieList />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/add-movie" element={<AddMovie />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </AuthProvider>
      </>
  );
}

export default App;

