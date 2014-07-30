'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ToDo = mongoose.model('Todo');

/* GET users listing. */
router.get('/', function(req, res) {

	// fetch all the books from db
	ToDo.find({}, function(err, todos){
		res.render('todo', {title: 'ToDo', todos: todos});
	});

});

router.get('/delete/:id', function(req, res) {

	// fetch all the books from db
	ToDo.findByIdAndRemove(req.params.id, function(err){

		if(err){
				return res.end(JSON.stringify(err));
		}
	});
	res.redirect('/todo');
});

router.get('/create', function(req, res) {
	res.render('todo-form', {title: 'Add To Do'});
});

router.post('/create', function(req, res) {
	var todo = new ToDo(req.body);

	// save book to db
	todo.save(function(err) {
		// if error, then prints error
		if (err) {
			return res.end(JSON.stringify(err));
		}

		// if success, then redirect page to /books
		res.redirect('/todo');
	});

});

module.exports = router;
