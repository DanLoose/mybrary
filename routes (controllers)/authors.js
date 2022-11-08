const express = require('express')
const Author = require('../models/author')

const router = express.Router()

// all authors page
router.get('/', async (req, res) => {

    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name.trim(), 'i')
    }

    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: req.query })
    } catch (error) {
        res.redirect('/')
    }
})

// new authors page
router.get('/new', (req, res) => res.render('authors/new', { author: new Author() }))

// create author route
router.post('/', async (req, res) => {

    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        res.redirect('authors')
        // res.redirect(`authors/${newAuthor.id}`)
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author.'
        })
    }

})


module.exports = router