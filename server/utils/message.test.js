var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () =>{
    var res = generateMessage("walter", "new message");

    expect(res.from).toBe('walter');
    expect(res.text).toBe('new message');
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () =>{
    var loc = generateLocationMessage("Admin", 1, 1);

    expect(loc.from).toBe('Admin');
    expect(loc.url).toBe('https://www.google.com/maps?q=1,1');
    expect(typeof loc.createdAt).toBe('number');
  });
});
