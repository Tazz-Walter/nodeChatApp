var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () =>{
    var res = generateMessage("walter", "new message");

    expect(res.from).toBe('walter');
    expect(res.text).toBe('new message');
    expect(typeof res.createdAt).toBe('number');
  });
});
