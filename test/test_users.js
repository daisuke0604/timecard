var users = require('../users');
var should = require('should');

describe('users test', function() {
    
    it('ユーザ追加', function() {
        users.insert("test@test.co.jp", "テスト 太郎", "pass", 0);
    });

    it('ユーザ検索', function() {
        var user = users.findById("test@test.co.jp");
    });

});
