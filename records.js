var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/db.sqlite3');

// Insert record
exports.insert = function(date, mail, present, clook_in, clook_off, overtime, latenight, holiday, subtract) {
    db.serialize(function() {
    });
};

// Update record
exports.update = function(date, mail, present, clook_in, clook_off, overtime, latenight, holiday, subtract) {
    db.serialize(function() {
    });
};

// Delete record
exports.delete = function(id) {
    db.serialize(function() {
    });
};

// Find by date & mail
exports.findByDateAndMail = function(date, mail) {
    db.serialize(function() {
    });
};

// Find by month
exports.findByMonth = function(yyyymm) {
    db.serialize(function() {
    });
};

