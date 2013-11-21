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

var users = require("users"),
    User = require("user");

var user = new User();

// LocalStrategy設定
passport.use(new LocalStrategy(
    {usernameField: "mail", passowrdField: "password"},
    function(mail, password, done) {
        process.nextTick(function() {
            users.findById(mail, user, function(err) {
                if (err) {
                    // 見つからない場合も含む
                    return done(err);
                }
                var hashedPass = getHash(password);
                if (user.password !== hashedPass) {
                    return done(null, false, {message: 'ログインエラー'});
                }
                return done(null, user);
            });
        });
    }
));
