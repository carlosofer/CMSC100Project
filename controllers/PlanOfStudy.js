var db = require(__dirname + '/mysql');

/* Views all subjects of a student */
exports.getAllSubjects = function (req, res, next) {
     db.query("SELECT * FROM curriculum_course cc, course c WHERE cc.course = c.code AND curriculum = (SELECT curriculum FROM student WHERE studentNumber = ?)",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Retrieves all subjects of a student */
exports.getPlanOfStudy = function (req, res, next) {
     db.query("SELECT * FROM plan_of_study WHERE studentNumber = ?",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Retrieves total number of units of a student */
exports.getTotalUnits = function (req, res, next) {
     db.query("SELECT sum(c.units) as 'totalNumOfUnits' FROM curriculum_course cc, course c WHERE cc.course = c.code AND curriculum = (SELECT curriculum FROM student WHERE studentNumber = ?)",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Adds a specific grade in the database */
exports.insertData = function (req, res, next) {
     db.query("INSERT INTO plan_of_study(id,studentNumber,year,semester,course,title,units) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [req.body.id, req.body.studentNumber, req.body.year, req.body.semester, req.body.course, req.body.title, req.body.units],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

/* Edits a specific grade in the database */
exports.updateCourse = function (req, res, next) {
    db.query("UPDATE plan_of_study SET title = ?, units = ? WHERE id = ?",
        [req.body.title, req.body.units, req.body.id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 
