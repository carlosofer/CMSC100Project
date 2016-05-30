'use strict';

var student = require(__dirname + '/../controllers/Student');
var grade = require(__dirname + '/../controllers/Grade');

module.exports = function(router) {

	router.post('/searchStudent', student.search);
	router.post('/addStudent', student.add);
	router.post('/archiveStudent', student.archive);
	router.post('/updateStudent', student.edit);
	router.get('/getStudents', student.retrieve);
	router.post('/listStudents', student.list);
	
	router.post('/addGrade', grade.create);
	router.post('/getGrade', grade.retrieve);
	router.put('/updateGrade', grade.update);
	router.delete('/deleteGrade', grade.remove);
	
	return router;
};
