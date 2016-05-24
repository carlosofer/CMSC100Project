var db = require(__dirname+'./../lib/Mysql');

exports.add = function(req, res, next) {

	if(req.body.studentNumber == null || req.body.studentNumber == "") {
		res.status(400).send("Error: Bad Argument!");
	}

	db.query("SELECT studentNumber FROM student WHERE " +
        "studentNumber = ?",
        [req.body.studentNumber],
        function(err, rows) {
            // Checks if the student already exists
            if (rows.length === 0) {
                db.query("INSERT INTO student (studentNumber, firstName, " +
                    "middleName, lastName, birthDate, college, degree, major, curriculum, status) VALUES " +
                    "(?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, ?, ?, ?)",
                    [req.body.studentNumber,req.body.firstName, req.body.middleName, req.body.lastName,
                    req.body.birthDate, req.body.college, req.body.degree, req.body.major, req.body.curriculum,
                    req.body.status],
                    function (err, rows) {
                        if (err) {

                            return next(err);
                        }

                        res.send(rows);
                    }
                );
            }

            else {
                res.send(400, "Error: Student already exists!");
            }
        }
    );
}

exports.edit = function (req, res, next) {

    db.query("SELECT studentNumber FROM student WHERE " +
        "studentNumber = ?",
        [req.body.studentNumber],
        function(err, rows) {
            // Checks if the student already exists
            if (err) {
                return next(err);
            }else if (rows.length != 0) {
                db.query("UPDATE STUDENT SET firstName = ?, " +
                    "middleName = ?, lastName = ?, birthday = STR_TO_DATE(?, '%Y-%m-%d'), college = ?, degree = ?, " +
                    "major = ?, curriculum = ?, status = ?, isArchived = ?" +
                    "WHERE studentNumber = ?",
                    [req.body.firstName,
                    req.body.middleName, req.body.lastName, req.body.birthday,
                    req.body.college, req.body.degree, req.body.major, 
                    req.body.curriculum, req.body.status, req.body.isArchived, req.body.studentNumber],
                    function (err, rows) {
                        if (err) {
                            return next(err);
                        }
                        res.send(rows);
                    }
                );
            }
            else {
                res.send(400, "Error: Student already exists!");
            }
        }
    );
}

exports.archive = function() {

	db.query("SELECT studentNumber FROM student WHERE " +
        "studentNumber = ?",
        [req.body.studentNumber],
        function(err, rows) {
            // Checks if the student already exists
            if (err) {
                return next(err);
            }else if (rows.length != 0) {
                db.query("UPDATE STUDENT SET isArchived = true WHERE studentNumber = ?",
                    [req.body.studentNumber],
                    function (err, rows) {
                        if (err) {
                            return next(err);
                        }
                        res.send(rows);
                    }
                );
            }
            else {
                res.send(400, "Error: Student already exists!");
            }
        }
    );
}

exports.searchByStudentNumber = function(req, res, next) {

    db.query("SELECT * FROM student where studentNumber = ?",
        [req.body.studentNumber],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                res.send(404, "Error: Student not found!");
            } else {
                res.send(rows);
            }
        }
    );
}

exports.searchByName = function(req, res, next) {

    db.query("SELECT * FROM student where firstName = ? AND middleName = ? AND lastName = ?",
        [req.body.firstName, req.body.middleName, req.body.lastName],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                res.send(404, "Error: Student not found!");
            } else {
                res.send(rows);
            }
        }
    );
}

exports.search = function(req, res, next) {

    db.query("SELECT * FROM student where firstName = ? AND middleName = ? AND lastName = ? AND studentNumber = ?",
        [req.body.firstName, req.body.middleName, req.body.lastName, req.body.studentNumber],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                res.send(404, "Error: Student not found!");
            } else {
                res.send(rows);
            }
        }
    );
}