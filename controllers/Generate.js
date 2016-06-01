var db = require(__dirname + '/mysql');

/* Lists all grades of a student */
exports.generateTCG = function (req, res, next) {
     db.query("SELECT * FROM grade where studentNumber = ?",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Generates list of graduating students */
exports.viewGraduating = function (req, res, next) {
    db.query("SELECT * FROM student where status = '4'", 
        function (err, rows) {
        if (err) {
            return next(err);
        }
        res.send(rows);
    });
}

/* Generates checklist of student with input student number */
exports.generateChecklist = function (req, res, next) {
	db.query("SELECT distinct poc.id, poc.year,poc.semester,poc.course,poc.title,poc.units,g.grade FROM plan_of_study poc left join grade g on poc.course = g.course WHERE poc.studentNumber = ?",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
            console.log(rows);
    });
}

/* Generates list of delinquent students */
exports.generateDelinquent = function (req, res, next) {
	db.query("SELECT studentNumber, firstName, middleName, lastName WHERE studentNumber = ?", 
		[req.body.studentNumber],
		
		function (err, rows) {
			if (err) {
				return next(err);
            }
			res.send(rows);
	    });
}

exports.generatePercent = function (req, res, next) {
	db.query("select studentNumber, (select sum(units) from grade where remarks='Satisfactory' and studentNumber=? and year=? and semester = ?)/(select sum(units) from grade where studentNumber=? and year=? and semester = ?) as 'percent' from grade where studentNumber=? and year=? and semester = ? LIMT 1;", 
		[req.body.studentNumber, req.body.year, req.body.semester,req.body.studentNumber, req.body.year, req.body.semester,req.body.studentNumber, req.body.year, req.body.semester],
		
		function (err, rows) {
			if (err) {
				return next(err);
            }
			res.send(rows);
	    });
}
