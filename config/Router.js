'use strict';

var student = require(__dirname + '/../controllers/Student');
var grade = require(__dirname + '/../controllers/Grade');

module.exports = function(router) {

	router.put('/student', student.searchByStudentNumber);
	router.put('/student', student.searchByName);
	router.put('/student', student.search);
	router.post('/student', student.add);
	router.put('/student', student.archive);
	router.put('/student', student.edit);
	
	router.post('/grade', grade.create);
	router.post('/grade', grade.retrieve);
	router.put('/grade', grade.update);
	router.delete('/grade', grade.remove);
	
	return router;
};
