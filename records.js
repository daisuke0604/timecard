var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/db.sqlite3');

// Insert record
exports.insert = function(record, opt_callback) {
    db.serialize(function() {
        db.run(
            "INSERT INTO records " +
            "(date, mail, present, clook_in, clook_off, overtime, latenight, holiday, subtract) " + 
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            record.date, record.mail, record.present, record.clook_in, record.clook_off, 
            record.overtime, record.latenight, record.holiday, record.subtract, 
            function(err) {
                if (opt_callback) opt_callback(err || null);
            }
        );
    });
};

// Update record
exports.update = function(date, mail, present, clook_in, clook_off, overtime, latenight, holiday, subtract, opt_callback) {
    db.serialize(function() {
    });
};

// Delete record
exports.deleteOne = function(date, mail, opt_callback) {
    db.serialize(function() {
        db.run("DELETE FROM records WHERE date = ? AND mail = ?", date, mail, function(err) {
            if (opt_callback) opt_callback(err || null);
        });
    });
};

// Find by date & mail
exports.findByDateAndMail = function(date, mail, opt_callback) {
    db.serialize(function() {

    });
};

// Find by month
exports.findByMonth = function(yyyymm, opt_callback) {
    db.serialize(function() {
    });
};

