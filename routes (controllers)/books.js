const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')

const router = express.Router()


// all book page
router.get('/', async (req, res) => {

    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title.trim(), 'i')
    }

    try {
        const books = await Book.find(searchOptions)
        res.render('books/index', { books: books, searchOptions: searchOptions })
    } catch (error) {
        res.redirect('/')
    }
})

// new book page
router.get('/new', async (req, res) => {
    const authors = await Author.find({})
    res.render('books/new', { authors: authors, book: new Book() })
})

// create book route
router.post('/', async (req, res) => {

    // console.log(req.body);

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
    try {
        const newBook = await book.save()
        res.redirect('books')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})


module.exports = router