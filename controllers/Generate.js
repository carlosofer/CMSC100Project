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

/* Generates list of delinquent students */
exports.generateDelinquent = function (req, res, next) {
    if(req.body.status == 8) {
        db.query("SELECT * FROM grade WHERE year = ? AND semester = ? AND status > 4",
		    [req.body.year, req.body.semester],
		
		    function (err, rows) {
                if (err) {
                    return next(err);
                }

                res.send(rows);
	    });
    } else {
	    db.query("SELECT * FROM grade WHERE year = ? AND semester = ? AND status = ?",
		    [req.body.year, req.body.semester, req.body.status],
		
		    function (err, rows) {
                if (err) {
                    return next(err);
                }

                res.send(rows);
	    });
	}
}

