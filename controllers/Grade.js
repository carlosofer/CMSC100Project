var db = require(__dirname + '/mysql');

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

/* Retrieves a grade */
exports.retrieve = function(req, res, next) {
    var query = "";
    if(req.body.studentNumber != null) {
        query += " studentNumber = " + req.body.studentNumber;
    }
    if(req.body.course != null) {
        if(query != "") query += " AND ";
        query += "AND lastName = " + req.body.course;
    }
    if(req.body.section != null) {
        if(query != "") query += " AND ";
        query += "AND degree = " + req.body.section;
    }
    if(req.body.year != null) {
        if(query != "") query += " AND ";
        query += "AND curriculum = " + req.body.year;
    }
    if(req.body.semester != null) {
        if(query != "") query += " AND ";
        query += "AND curriculum = " + req.body.semester;
    }
    
    console.log(query);
    db.query("SELECT * FROM grade WHERE " + query,
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
