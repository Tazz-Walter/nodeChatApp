const {Users} = require('./users');

describe('Users', () => {
  beforeEach(()=>{
    usuarios = new Users();
    usuarios.users = [{
      id: '1',
      name: 'walter',
      room: 'deveps'
    },{
      id: '2',
      name: 'debo',
      room: 'deveps2'
    },{
      id: '3',
      name: 'alice',
      room: 'deveps'
    }];
  })

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

  it('should remove a user from array', () => {
    var elUsuario = usuarios.removeUser('1');
    var listaEsperada = [{id: '2', name: 'debo', room: 'deveps2'},{id: '3', name: 'alice', room: 'deveps'}];
    expect(usuarios.users).toEqual(listaEsperada);
    expect(elUsuario).toEqual({id: '1', name: 'walter', room: 'deveps'});
  });

  it('should not remove a user from array', () => {
    var elUsuario = usuarios.removeUser('4');
    expect(elUsuario).toBeFalsy();
  });

  it('should find user by Id', () => {
    var nuevaLista = usuarios.getUser('2');
    expect(nuevaLista).toEqual(usuarios.users[1]);
  });

  it('should not find user with incorrect Id', () => {
    var nuevaLista = usuarios.getUser('5');
    expect(nuevaLista).toBeFalsy();
  });

  it('should return names of deveps2 rooms', () => {
    var listaUsuarios = usuarios.getUserList('deveps2');
    expect(listaUsuarios).toEqual(['debo']);
  });

  it('should return names of deveps rooms', () => {
    var listaUsuarios = usuarios.getUserList('deveps');
    expect(listaUsuarios).toEqual(['walter', 'alice']);
  });

});
