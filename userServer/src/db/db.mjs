import mysql from "mysql";
import knex from "knex";

export const DBconnection = knex({
  client: "mysql",
  connection: {
    database: "userDB",
    host: "userdb57.camkrfkik2hb.ca-central-1.rds.amazonaws.com",
    user: "wl9001180",
    password: "wltc9018"
  },
  pool: { min: 0, max: 10 }
});
