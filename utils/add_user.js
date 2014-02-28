var users = require('../models/users'),
    should = require('should');

var crypto = require('crypto');

var secretKey = "benest_daisuke_yamamoto";
var getHash = function(target){
    var sha = crypto.createHmac("sha256", secretKey);
    sha.update(target);
    return sha.digest("hex");
};

var newuser = new users.User("test1@test.co.jp", "テスト 太郎", getHash("pass"), 0);
users.insert(newuser);

