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
exports.generateGraduating = function (req, res, next) {
    db.query("SELECT * FROM student where status = '3'", 
        function (err, rows) {
        if (err) {
            return next(err);
        }
        res.send(rows);
    });
}

/* Generates list of delinquent students */
exports.generateDelinquent = function (req, res, next) {
	db.query("SELECT * FROM grade WHERE year = ? AND semester = ?",
		[req.body.year, req.body.semester],
		
		function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
	});
}

