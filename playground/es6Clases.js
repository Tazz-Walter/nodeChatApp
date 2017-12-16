// var users = [];
// var AddUser = (id, name, room) => {
//   users.push({id, name, room});
// };
// modules.export = {addUser}; // para poder usar el metodo desde otro lugar se lo exporta

// usando ES6 clases sintax instans of class and methods
class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
  getUser () {
    return `${this.name} is ${this.age} year old.`;
  }
}
var me = new Person('walter', 31); //nueva instancia de persona
console.log(me.getUser());
