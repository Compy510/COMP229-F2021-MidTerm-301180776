/*
Filename: books.js
Author: Arshad Khan
StudentID: 301180776
WebApp name: COMP229-F2021-MidTerm-301180776
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the book Details page in order to add a new book
router.get('/details-add', (req, res, next) => {
  res.render('books/details-add', {title: 'Add book'})
});

// POST process the book Details page and create a new book - CREATE
router.post('/details-add', (req, res, next) => {
  let addedBook = book({
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre

  });

  book.create(addedBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
});

// GET the book Details page in order to edit an existing book
router.get('/details/:id', (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, bookToUpdate) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.render('books/details', {title: 'Edit book', books: bookToUpdate})
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedBook = book({
    "_id" : id,
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre

  });

  book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err); 
      }
      else
      {
          res.redirect('/books');
      }
  })
});


module.exports = router;
