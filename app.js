var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

// ハッシュ値計算準備
var crypt = require('crypto');
var secretKey = "benest_daisuke_yamamoto";
var getHash = function(target) {
    var sha = crypto.createHmac("sha256", secretKey);
    sha.update(target);
    return sha.digest("hex");
}

// Passport準備
var flash = require('connect-flush')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').strategy;


// Passportでのセッション設定
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


