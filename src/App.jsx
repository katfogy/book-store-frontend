import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import AuthorDetails from './components/AuthorDetails';
import Authors from './components/Authors'; // Import the Authors component
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import AddBook from './components/AddBook'; // Import the AddBook component
import AddAuthor from './components/AddAuthor'; // Import the AddAuthor component
import EditBook from './components/EditBook'; // Import the UpdateBook component
import EditAuthor from './components/EditAuthor'; // Import the EditAuthor component

const App = () => {
    return (
        <Router>
            <Navigation />  {/* Navigation is displayed on every page */}
            <Container className="d-flex flex-column justify-content-center align-items-center border mt-3 mb-3">
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} /> {/* Add route for AddBook */}
                    <Route path="/add-author" element={<PrivateRoute><AddAuthor /></PrivateRoute>} /> {/* Add route for AddAuthor */}
                    <Route path="/book-detail/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
                    <Route path="/authors" element={<PrivateRoute><Authors /></PrivateRoute>} />  {/* Authors route */}
                    <Route path="/author/:id" element={<PrivateRoute><AuthorDetails /></PrivateRoute>} />  {/* Author details route */}
                    <Route path="/edit-book/:id" element={<PrivateRoute><EditBook /></PrivateRoute>} /> {/* Add route for UpdateBook */}
                    <Route path="/edit-author/:id" element={<PrivateRoute><EditAuthor /></PrivateRoute>} /> {/* Add route for EditAuthor */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
