import fs from 'fs-extra';

const getAllBooks = async (req, res) => {
  try {
    const books = await fs.readJson('books.json');

    res.render('index', {
      books: books.length === 0 ? 'There are no books in the library' : books
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error: `There is no file with name books.json`
    });
  }
};

const getBookDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const books = await fs.readJson('books.json');
    const book = books.find(book => book.id === Number(id));

    if (!book) {
      res
        .status(404)
        .json({ status: 'fail', error: `There is no book with id: ${id}` });
    } else {
      res.render('book', { book });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error: `There is no file with name books.json`
    });
  }
};

const createBook = async (req, res) => {
  const { name } = req.body;
  try {
    const books = await fs.readJson('books.json');
    const book = books.find(book => book.name === name);
    if (book) {
      res.status(400).json({
        status: 'fail',
        error: `Book with name ${name} already exists`
      });
    } else {
      const newBook = {
        id: books.length + 1,
        name
      };
      books.push(newBook);
      await fs.writeJson('books.json', books);
      res.status(201).json({
        status: 'success',
        data: newBook
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error: `There is no file with name books.json`
    });
  }
};

export { getAllBooks, createBook, getBookDetails };
