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
  getUserByName (name) {
    return this.users.filter((user) => user.name.toUpperCase() === name.toUpperCase())[0];
  }
  getRoomsArray () {
    var allRooms =[];
    var users = this.users;
    for (var key in users) {
       if (users.hasOwnProperty(key)) {
            if(!allRooms.includes(users[key].room)) {
              allRooms.push(users[key].room);
            }
       }
    }
    return allRooms;
   }
  getUserList(room) {
    var usuarios= this.users.filter((user) => user.room === room);
    //map itera sobre usuarios y va haciendo un array de nombres
    var nombresArray = usuarios.map((user) => user.name);
    return nombresArray;
  }
}

module.exports = {Users};
