// [{
//   id: '/#234asasdf',
//   name: 'Walter',
//   room: 'Developers'
// }]

class Users {
  constructor () {
    this.users = [];
  }
  //methods
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room) {
    var usuarios= this.users.filter((user) => user.room === room);
    var nombresArray = usuarios.map((user) => user.name);
    return nombresArray;
  }
}

module.exports = {Users};
