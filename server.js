const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: 'Oliver Twist' },
    { id: 2, title: 'The Tale of Two Cities' }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.post('/books', (req, res) => {
    const title = req.body.title;

    if (!title) {
        return res.status(400).json({ message: 'title cannot be empty' });
    }

    const newBook = {
        id: books.length + 1,
        title: title
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const newTitle = req.body.title;

    if (newTitle) {
        book.title = newTitle;
    }

    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});