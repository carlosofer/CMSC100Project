'use strict';

var student = require(__dirname + '/../controllers/Student');
var grade = require(__dirname + '/../controllers/Grade');
var pos = require(__dirname + '/../controllers/PlanOfStudy');
var generate = require(__dirname + '/../controllers/Generate');

module.exports = function(router) {

	router.post('/searchStudent', student.search);
	router.post('/addStudent', student.add);
	router.post('/archiveStudent', student.archive);
	router.post('/updateStudent', student.edit);
	router.get('/getStudents', student.retrieve);
	router.post('/listStudents', student.list);
	router.post('/updateStatus', student.updateStatus);
	
	router.get('/getGrades', grade.viewAll);
	router.post('/createGrade', grade.create);
	router.post('/retrieveGrade', grade.retrieve);
	router.post('/updateGrade', grade.update);
	router.post('/removeGrade', grade.remove);
	router.post('/computeGPA', grade.computeGPA);
	
	router.post('/getAllSubjects', pos.getAllSubjects);
	router.post('/getPlanOfStudy', pos.getPlanOfStudy);
	router.post('/getTotalUnits', pos.getTotalUnits);
	router.post('/insertData', pos.insertData);
	router.post('/updateCourse', pos.updateCourse);
	
	router.post('/generateTCG',generate.generateTCG);
	router.get('/viewGraduating', generate.viewGraduating);
	router.post('/generateDelinquent', generate.generateDelinquent);
	router.post('/generateChecklist', generate.generateChecklist);
	
	return router;
};
