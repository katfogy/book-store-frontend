import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for fetching the book ID
import axios from 'axios';
import BASE_URL from '../api/api'; // Ensure BASE_URL is correctly imported

const EditBook = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [authors, setAuthors] = useState([]); // State to hold authors
    const [error, setError] = useState('');
    const [book, setBook] = useState({
        title: '',
        author_id: '', // This will hold the selected author ID
        description: ''
    }); // State to hold book details
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        if (!token) {
            // Redirect to login page if token is missing
            navigate('/login');
            return;
        }

        // Fetch authors for dropdown
        axios.get(`${BASE_URL}/all-authors`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setAuthors(response.data.data);
        })
        .catch(error => {
            console.error(error);
            setError('Error fetching authors');
        });

        // Fetch existing book details
        axios.get(`${BASE_URL}/book-detail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data); 
            setBook(response.data); // Set the existing book details
        })
        .catch(error => {
            console.error(error);
            setError('Error fetching book details');
        });
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // API call to update the existing book
        axios.put(`${BASE_URL}/update-book/${id}`, book, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('Book updated successfully!'); // Notify user
            navigate('/'); // Redirect to home or desired page
        })
        .catch(err => {
            console.error(err);
            // Check if the error response contains a message and set it
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error updating book');
            }
        });
    };

    return (
        <div className="container mb-2">
            <h1 className="my-4">Edit Book</h1>
            {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        value={book.title} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author_id" className="form-label">Author</label>
                    <select 
                        className="form-select" 
                        id="author_id" 
                        name="author_id" 
                        value={book.author_id} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Author</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        value={book.description} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Book</button>
            </form>
        </div>
    );
};

export default EditBook;
