var users = require('../models/users'),
    should = require('should');

describe('userテーブルのテスト', function() {

    it('ユーザ追加', function(done) {
        var newuser = new users.User("test@test.co.jp", "テスト 太郎", "pass", 0);
        users.insert(newuser, function(err) {
            should.not.exists(err);
            done();
        });
    });

    var user = new users.User();
    it('ユーザ検索', function(done) {
        users.findById('test@test.co.jp', user, function(err) {
            should.not.exists(err);
            done();
        });
    });

    it('値の検証', function() {
        should.exists(user);
        should.equal(user.mail, 'test@test.co.jp');
        should.equal(user.name, 'テスト 太郎');
    });

    it('ユーザ削除', function(done) {
        users.deleteById(user.mail, function(err) {
            done();
        });
    });

    it('ユーザ検索（いない）', function(done) {
        users.findById('test@test.co.jp', user, function(err) {
            should.equal(err, 'not found');
            done();
        });
    });

});

