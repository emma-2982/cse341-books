// src/controllers/books.js
import {
    getAllBooks, getBookById, createBook,
    updateBook,
    deleteBook } from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    
    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createBookHandler = async (req, res) => {
    try {
        const book = req.body;

        await createBook(book);

        return res.status(201).json({
            message: 'Book created successfully'
        });
    } catch (error) {
        if (error.message === 'AUTHOR_NOT_FOUND') {
            return res.status(400).json({
                message: 'The specified author does not exist'
            });
        }

        console.error('POST /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT /books/:id
const updateBookHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const result = await updateBook(requestedId, req.body);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({
            message: 'Book updated successfully'
        });
    } catch (error) {
        if (error.message === 'AUTHOR_NOT_FOUND') {
            return res.status(400).json({
                message: 'The specified author does not exist'
            });
        }

        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBookHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const result = await deleteBook(requestedId);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };