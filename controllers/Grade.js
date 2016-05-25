var db = require(__dirname + './../lib/Mysql');

/* Adds a specific grade in the database */
exports.create = function (req, res, next) {
     db.query("INSERT INTO grade(year,semester,studentNumber,course,section," + 
        "units,grade,remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [req.body.year, req.body.semester, req.body.studentNumber,
        req.body.course, req.body.section, req.body.units, 
        req.body.grade, req.body.remarks],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Searches a grade */
exports.retrieve = function(req, res, next) {
    var column = "", params = "";
    
    if(req.body.studentNumber!="") {
        column = "studentNumber";
        params = req.body.studentNumber;
    } else if(req.body.course!="") {
        column = "course";
        params = req.body.course;
    } else if(req.body.section!="") {
        column = "section";
        params = req.body.section;
    } else if(req.body.year!="") {
        column = "year";
        params = req.body.year;
    } else if(req.body.semester!="") {
        column = "semester";
        params = req.body.semester;
    }
    
	db.query("SELECT * FROM grade WHERE " + column + " LIKE '%" +
	        params + "%'",
		function (err, rows) {
            if (err) {
                return next(err);
            }
            
            if (rows.length === 0) {
                res.send(404, "Error: Grade not found!");
	        } else {
                res.send(rows);
	        }
	});
}

/* Edits a specific grade in the database */
exports.update = function (req, res, next) {
    db.query("UPDATE grade SET year = ?, semester = ?, " +
        "studentNumber = ?, course = ?, section = ?, units = ?, " + 
        "grade = ?, remarks = ? WHERE id = ?",
        [req.body.year, req.body.semester, req.body.studentNumber_new,
        req.body.course, req.body.section, req.body.units, 
        req.body.grade, req.body.remarks, req.body.id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Removes a grade from the database */
exports.remove = function (req, res, next) {
    db.query('DELETE FROM grade WHERE id = ?', [req.body.id], 
        
        function (err, rows) {
            if (err) {
                return next(err);
            }
            
            if (!rows.affectedRows) {
                res.send(400, "Error: No student was deleted.");
            }

            res.send(rows);
    });
}
