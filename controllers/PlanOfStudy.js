var db = require(__dirname + '/mysql');

/* Retrieves all subjects of a student */
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

