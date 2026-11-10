import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();
    return books;
};

const getBookById = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');
    const book = await collection.findOne({ id: bookId });
    return book;
};

const authorExists = async (authorId) => {
    const db = getDb();

    const author = await db.collection('authors').findOne({
        id: authorId
    });

    return Boolean(author);
};

const createBook = async (book) => {
    const db = getDb();

    const exists = await authorExists(book.authorId);

    if (!exists) {
        throw new Error('AUTHOR_NOT_FOUND');
    }

    return await db.collection('books').insertOne(book);
};

const updateBook = async (bookId, book) => {
    const db = getDb();

    const exists = await authorExists(book.authorId);

    if (!exists) {
        throw new Error('AUTHOR_NOT_FOUND');
    }

    const updateFields = { ...book };
    delete updateFields.id;

    return await db.collection('books').updateOne(
        { id: bookId },
        { $set: updateFields }
    );
};

const deleteBook = async (bookId) => {
    const db = getDb();

    return await db.collection('books').deleteOne({
        id: bookId
    });
};


export { getAllBooks, getBookById, createBook, authorExists, updateBook, deleteBook };
