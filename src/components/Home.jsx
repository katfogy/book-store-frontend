import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import axios from 'axios';
import BASE_URL from '../api/api';  // Ensure BASE_URL is correctly imported

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Initialize useNavigate hook for redirection

    useEffect(() => {
        const token = localStorage.getItem('token');  // Get token from localStorage

        if (!token) {
            // Redirect to login page if token is missing
            navigate('/login');
            return;
        }

        // If token is present, make API request to fetch books
        axios.get(`${BASE_URL}/books`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setBooks(response.data.data);
            setFilteredBooks(response.data.data); // Initialize filteredBooks with all books
            setLoading(false);  // Stop loading after data is fetched
        })
        .catch(error => {
            console.error(error);
            setError('You must be logged in to access our content.');
            setLoading(false);  // Stop loading if there is an error
        });
    }, [navigate]);

    useEffect(() => {
        // Filter books based on the search term
        const results = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(results);
    }, [searchTerm, books]); // Run this effect when searchTerm or books change

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        // Confirm deletion
        if (window.confirm('Are you sure you want to delete this book?')) {
            axios.delete(`${BASE_URL}/delete-book/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // Update the state to remove the deleted book
                setBooks(books.filter(book => book.id !== id));
                alert('Book deleted successfully!');
            })
            .catch(error => {
                console.error(error);
                alert('Error deleting book.');
            });
        }
    };

    return (
        <div className="container mb-2">
            <h1 className="my-4">Book List</h1>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by title or description..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            {loading && <p>Loading books...</p>} {/* Display loading indicator */}
            {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            <div className="list-group">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={book.id}>
                            <Link
                                to={`/book-detail/${book.id}`}
                                className="list-group-item list-group-item-action flex-grow-1 me-2"
                            >
                                {book.title} by {book.author.name}
                            </Link>
                            <div className="d-flex"> {/* Add this flex container for buttons */}
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-book/${book.id}`)} // Adjust route accordingly
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : !loading && !error ? (
                    <p>No books available</p> // Handle case when no books are found
                ) : null}
            </div>
        </div>
    );
};

export default Home;
