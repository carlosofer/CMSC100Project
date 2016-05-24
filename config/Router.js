'use strict';

var student = require(__dirname + '/../controllers/Student');

module.exports = function(router) {

	router.get('/student', student.searchByStudentNumber);
	router.get('/student', student.searchByName);
	router.get('/student', student.search);

	router.post('/student', student.add);

	router.put('/student', student.archive);
	router.put('/student', student.edit);
	
	return router;
};