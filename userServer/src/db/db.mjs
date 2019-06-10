import mysql from 'mysql';
import knex from 'knex';

export const DB = knex({
  client: 'mysql',
  connection: {
    host: '35.193.247.29',
    user: 'root',
    password: 'wltc9018',
    database: 'userDB',
  },
  //pool: { min: 0, max: 10 }
});

// export const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "wltc9018",
//   database: "userdb"
// });
