var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/db.sqlite3');

// User object
var User = function(mail, name, password, option) {
    this.mail = mail;
    this.name = name;
    this.password = password;
    this.option = option;
};
exports.User = User;

// Add record
exports.insert = function(user, opt_callback) {
    db.serialize(function() {
        db.run("INSERT INTO users VALUES (?, ?, ?, ?)", user.mail, user.name, user.password, user.option, function(err) {
            if (opt_callback) opt_callback(err || null);
        });
    });
};

// Find record by mail
exports.findById = function(mail, user, opt_callback) {
    db.serialize(function() {
        db.get("SELECT * FROM users WHERE mail = ?", mail, function(err, row) {
            user.mail = row.mail;
            user.name = row.name;
            user.password = row.password;
            user.option = row.option;
            if (opt_callback) opt_callback(err || null);
        });
    });
};

