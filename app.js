var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var users = require("./models/users");

// ハッシュ値計算準備
var crypto = require('crypto');
var secretKey = "benest_daisuke_yamamoto";
var getHash = function(target) {
    var sha = crypto.createHmac("sha256", secretKey);
    sha.update(target);
    return sha.digest("hex");
};

// Passport準備
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Passportでのセッション設定
passport.serializeUser(function(user, done) {
    done(null, {mail: user.mail, name: user.name});
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var user = new users.User();

// LocalStrategy設定
passport.use(new LocalStrategy(
    {usernameField: "mail", passowrdField: "password"},
    function(mail, password, done) {
        process.nextTick(function() {
            users.findById(mail, user, function(err) {
                if (err) {
                    // 見つからない場合も含む
                    return done(null, false, 'ログインエラー');
                }
                var hashedPass = getHash(password);
                if (user.password !== hashedPass) {
                    console.log(user.password);
                    console.log(hashedPass);
                    return done(null, false, {message: 'ログインエラー'});
                }
                return done(null, user);
            });
        });
    }
));

// ログイン済みかどうか
var isLogined = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // 未ログイン
    res.redirect("/login");
};

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "benestbenestbenest"}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname,  'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get("/login", function(req, res){
    res.render("login", {user: req.user, message: req.flash("error")});
});
app.post("/login",
    passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}),
    function(req, res){
        // ログインに成功 -> Timecardページへ
        res.redirect("/timecard");
    }
);

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.get("/timecard", isLogined, function(req, res){
    res.render("timecard", {user: req.user});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

