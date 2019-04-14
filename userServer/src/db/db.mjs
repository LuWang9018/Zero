import mysql from 'mysql';

export let DBconnection = mysql.createConnection({
  database: 'userDB',
  host: 'userdb.camkrfkik2hb.ca-central-1.rds.amazonaws.com',
  user: 'wl9001180',
  password: 'wltc9018'
});

export function connectDB() {
  DBconnection.connect(function(err) {
    if (err) throw err;
    console.log('DB Connected!');
  });
}
