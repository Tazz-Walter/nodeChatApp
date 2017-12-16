const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject a non-String values', () => {
    var res = isRealString(36);
    expect(res).toBeFalsy();
  });

  it('should reject Strings with only spaces', () => {
    var res = isRealString("     ");
    expect(res).toBeFalsy();
  });

  it('should allow string with non-sapce characters ', () => {
    var res = isRealString("   walter  ");
    expect(res).toBeTruthy();
  });
});
