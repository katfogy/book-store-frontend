import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../api/api'; 

const BookDetails = () => {
  const { id } = useParams();  // Get the book ID from the URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const token = localStorage.getItem('token');  // Get the token from localStorage

      if (!token) {
        setError('You must be logged in to view this content.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/book-detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the request headers
          }
        });
        setBook(response.data);  // Set book data from the response
      } catch (err) {
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-2 mb-2">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
        Back
      </button>

      {book ? (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author.name}</p>
          <p>{book.description}</p>
          <p><strong>Published: </strong>{new Date(book.created_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
};

export default BookDetails;
