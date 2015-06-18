var expect = require('chai').expect;

var phparr = require('./index');

describe('phparr()', function() {

  it('should stringify number', function() {
    expect(phparr(1)).to.equal('1');
  });

  it('should stringify string', function() {
    expect(phparr('foo')).to.equal('"foo"');
  });

  it('should stringify boolean', function() {
    expect(phparr(true)).to.equal('true');
  });

  it('should stringify null', function() {
    expect(phparr(null)).to.equal('null');
  });

  it('should stringify array', function() {
    expect(phparr([1, 2, 3])).to.equal('[1,2,3]');
  });

  it('should stringify object', function() {
    expect(phparr({foo: 'FOO', bar: 'BAR'})).to.equal('["foo"=>"FOO","bar"=>"BAR"]');
  });

  it('should stringify complex object', function() {
    var result = phparr({
      foo: 'FOO',
      bar: 'BAR',
      baz: ['QUX', 1, true, null, {
        salt: 'SALT',
        pepper: 'PEPPER',
      }],
    });
    expect(result).to.equal('["foo"=>"FOO","bar"=>"BAR","baz"=>["QUX",1,true,null,["salt"=>"SALT","pepper"=>"PEPPER"]]]');
  });

  it('should stringify complex object with indent', function() {
    var result = phparr({
      foo: 'FOO',
      bar: 'BAR',
      baz: ['QUX', 1, true, null, {
        salt: 'SALT',
        pepper: 'PEPPER',
      }],
    }, '  ');
    var expected = ''
      + '[\n'
      + '  "foo" => "FOO",\n'
      + '  "bar" => "BAR",\n'
      + '  "baz" => [\n'
      + '    "QUX",\n'
      + '    1,\n'
      + '    true,\n'
      + '    null,\n'
      + '    [\n'
      + '      "salt" => "SALT",\n'
      + '      "pepper" => "PEPPER"\n'
      + '    ]\n'
      + '  ]\n'
      + ']';
    expect(result).to.equal(expected);
  });

});
