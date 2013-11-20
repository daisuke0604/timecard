var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/db.sqlite3');

// Add record
exports.insert = function(mail, name, password, option) {
    db.serialize(function() {
        db.run("INSERT INTO users VALUES (?, ?, ?, ?)", mail, name, password, option);
    });
};

// Find record by mail
exports.findById = function(mail) {
    db.serialize(function() {
        db.get("SELECT * FROM users WHERE mail = ?", mail, function(err, row) {
            return row;
        });
    });
};

