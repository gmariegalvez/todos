'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

/* GET users listing. */
router.get('/', function(req, res) {

	// fetch all the books from db
	Book.find({}, function(err, books){
		res.render('books', {title: 'Books', books: books});
	});

});

router.get('/create', function(req, res) {
	res.render('books-form', {title: 'Add New Book'});
});

router.post('/create', function(req, res) {
	var book = new Book(req.body);

	// save book to db
	book.save(function(err) {
		// if error, then prints error
		if (err) {
			return res.end(JSON.stringify(err));
		}

		// if success, then redirect page to /books
		res.redirect('/books');
	});

});

module.exports = router;
