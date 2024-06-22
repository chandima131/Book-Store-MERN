import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log('API response:', response.data); // Log API response
        setBook(response.data.book); // Update to access the inner book object
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error); // Detailed error logging
        setError('Failed to fetch book data'); // Set error message
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log('Book state:', book); // Log book state whenever it updates
  }, [book]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : error ? ( // Display error message if exists
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.auther}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
