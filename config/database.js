const mysql = require('mysql2');


const connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME,
  port     : process.env.DATABASE_PORT
});

module.exports = connection


// // Another Way
// module.exports = connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'realitor_api',
//   port: '3306'
// });