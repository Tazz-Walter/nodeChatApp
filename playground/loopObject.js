var p = [{
  id: '1',
  name: 'walter',
  room: 'Deveps'
},{
  id: '2',
  name: 'debo',
  room: 'deveps2'
},{
  id: '3',
  name: 'alice',
  room: 'deveps'
},{
  id: '4',
  name: 'alice',
  room: 'deveps2'
}];

//itero objetos
var arreglo =[];
for (var key in p) {
    if (p.hasOwnProperty(key)) {
         if(!arreglo.includes(p[key].room)) {
           arreglo.push(p[key].room);
         }
    }
}
console.log(arreglo);

// Array.prototype.groupBy = function(prop) {
//   return this.reduce(function(groups, item) {
//     var val = item[prop];
//     groups[val] = groups[val] || [];
//     groups[val].push(item);
//     return groups;
//   }, {});
// }
// console.log(p.groupBy('room'));
