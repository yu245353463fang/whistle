var util = require('../util.test');

module.exports = function() {
  util.request('http://filter.com/index.html', function(res, data) {
    data.should.have.property('ec', 0);
  });

  util.request({
    url: 'https://filter.com/index.html',
    method: 'delete',
    body: '1'.repeat(1024 * 250) + 'test'
  }, function(res, data) {
    data.should.have.property('ec', 1);
  });
  util.request({
    url: 'https://filter.com/index.html',
    method: 'post',
    body: 'test',
    headers: {
      'test': 'abc'
    }
  }, function(res, data) {
    data.should.have.property('ec', 1);
  });

  util.request({
    url: 'https://filter.com/index.html',
    method: 'post',
    headers: {
      'test': 'abc',
      'x-test': 'hehe'
    }
  }, function(res, data) {
    data.should.have.property('ec', 3);
  });

  util.request({
    url: 'https://filter.com/index.html',
    method: 'post',
    headers: {
      'test': 'abc',
      'x-test': '123'
    }
  }, function(res, data) {
    data.should.have.property('ec', 4);
  });
};