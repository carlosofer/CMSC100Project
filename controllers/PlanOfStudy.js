var db = require(__dirname + '/mysql');

/* Retrieves all subjects of a student */
exports.getAllSubjects = function (req, res, next) {
     db.query("SELECT * FROM curriculum_course WHERE curriculum = (SELECT curriculum FROM student WHERE studentNumber = ?)",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

