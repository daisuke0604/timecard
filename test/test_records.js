var records = require('../models/records'),
    should = require('should');

describe('recordsテーブルのテスト', function() {

    it('レコード追加', function(done) {
        var newrecord = new records.Record('2013/11/21', 'test@test.co.jp', 1, '0900', '1800', '0', '0', '0', '0');
        records.insert(newrecord, function(err) {
            should.not.exists(err);
            done();
        });
    });

    it('レコード削除', function(done) {
        records.deleteOne('2013/11/21', 'test@test.co.jp', function(err) {
            should.not.exists(err);
            done();
        });
    });


});

