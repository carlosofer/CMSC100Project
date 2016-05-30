var db = require(__dirname + '/mysql');

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
                    "middleName, lastName, birthDate, sex, college, degree, major, curriculum) VALUES " +
                    "(?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, ?, ?, ?)",
                    [req.body.studentNumber,req.body.firstName, req.body.middleName, req.body.lastName,
                    req.body.birthDate, req.body.sex, req.body.college, req.body.degree, req.body.major, req.body.curriculum],
                    function (err, rows) {
                        if (err) {
                           res.send('Error while performing Query.');
                        }

                        res.send(rows);
                });
            }
            else {
                res.send(400, "Error: Student already exists!");
            }
        });
}

exports.edit = function (req, res, next) {
    db.query("SELECT studentNumber FROM student WHERE studentNumber = ?", [req.body.studentNumber],
        function(err, rows) {
            // Checks if the student already exists
            if (err) {
                return next(err);
            } else if (rows.length != 0) {
                db.query("UPDATE student SET firstName = ?, " +
                    "middleName = ?, lastName = ?, birthDate = STR_TO_DATE(?, '%Y-%m-%d'), sex = ?, college = ?, degree = ?, " +
                    "major = ?, curriculum = ? WHERE studentNumber = ?",
                    [req.body.firstName, req.body.middleName, req.body.lastName, req.body.birthDate, req.body.sex,
                    req.body.college, req.body.degree, req.body.major, req.body.curriculum, req.body.studentNumber],
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
        });
}

exports.archive = function(req, res, next) {
	db.query("UPDATE student SET isArchive = 1 WHERE studentNumber = ?",
        [req.body.studentNumber],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
        });
}

exports.search = function(req, res, next) {
    var query = "";
    if(req.body.studentNumber != null) {
        query += "AND studentNumber like '%" + req.body.studentNumber + "%' ";
    }
    if(req.body.lastName != null) {
        query += "AND lastName like '%" + req.body.lastName + "%' ";
    }
    if(req.body.degree != null) {
        query += "AND degree like '%" + req.body.degree + "%' ";
    }
    if(req.body.curriculum != null) {
        query += "AND curriculum like '%" + req.body.curriculum + "%' ";
    }
    
    console.log(query);
    db.query("SELECT * FROM student WHERE isArchive = 0 " + query,
        function (err, rows) {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                res.send(404, "Error: Student not found!");
            } else {
                res.send(rows);
            }
        });
}

exports.retrieve = function(req, res, next) {
    db.query("SELECT * FROM student WHERE isArchive = 0",
        function (err, rows) {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                res.send(404, "Error: Students not found!");
            } else {
                res.send(rows);
            }
        });
}

exports.list = function(req, res, next) {
    var query = "";
    if(req.body.value == 1) {
        query = "studentNumber";
    } else if(req.body.value == 2) {
        query = "lastName";
    } else if(req.body.value == 3) {
        query = "degree";
    } else {
        query = "curriculum";
    }
    
    db.query("SELECT * FROM student WHERE isArchive = 0 order by " + query,
        function (err, rows) {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                res.send(404, "Error: Students not found!");
            } else {
                res.send(rows);
            }
        });
}
