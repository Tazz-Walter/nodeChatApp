const {Users} = require('./users');

describe('Users', () => {

  it('should add new user', () => {
    var usuarios = new Users();

    var newUser = {
      id: '123',
      name: 'walter',
      room: 'developers'
    };
    var resUser = usuarios.addUser(newUser.id, newUser.name, newUser.room);
    expect(usuarios.users).toEqual([newUser]);
  });

});
