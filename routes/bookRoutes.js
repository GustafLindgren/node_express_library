import express from 'express';
import books from '../controllers/booksController.js';
// universally unique identifier
// import {v4 as uuidv4} from 'uuid';

const router = express.Router();

// mock database
/*let books = [
    {
        id: uuidv4(),
        title: 'The fellowship of the Ring',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        language: 'English',
        published: new Date('1991-07-04'),
        isbn: '9780261102354',
        noCopies: 5,
        available: 3

    },
    {
        id: uuidv4(),
        title: 'Im Westen nichts Neues',
        author: 'Erich Maria Remarque',
        genre: 'War novel',
        language: 'German',
        published: new Date('2014-03-08'),
        isbn: '9783462046335',
        noCopies: 1,
        available: 1 
    },
    {
        title: 'Utvandrarna',
        author: 'Vilhelm Moberg',
        genre: 'Classic',
        language: 'Swedish',
        published: new Date('2013-01-15'),
        isbn: '9789174293081',
        noCopies: 2,
        available: 1 
    }
]*/
// get list of books from the mock database
// sets up route that responds to HTTP GET requests
router.get('/', books.getAll);

router.post('/', books.create);

router.get('/:id', books.get);

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    books = books.filter((book) => book.id !== id);
    res.send(id + ' was successfully deleted from the database');
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, language, published, isbn, noCopies, 
        available } = req.body;
    const book = books.find((book) => book.id === id)

    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (language) book.language = language;
    if (published) book.published = published;
    if (isbn) book.isbn = isbn;
    if (noCopies) book.noCopies = noCopies;
    if (available) book.available = available;

    res.send(id + ' was successfully updated');
})

export default router