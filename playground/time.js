//Jan 1st 1970 00:00:00 am = 0 miliseg.
//Jan 1st 1970 00:00:01 am = 1000 miliseg. = 1 seg.
var moment = require('moment');

var date = moment();
console.log(date.valueOf());//inmprime el TimesStamp igual a
//new Date().getTime()
// console.log(date.format('MMM YYYY'));
console.log(date.startOf('mm').fromNow());
console.log(date.format('h:mm a'));
