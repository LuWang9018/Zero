import { DBconnection } from "../db/db";
import uuidv4 from "uuid/v4";
import { auth, genHash } from "./Utils";
import util from "util";

export async function createUser(attrs, options = {}) {
  //1. check user name

  //2. check email

  let userId = uuidv4();
  let user = await genHash({ password: attrs.password });

  DBconnection("user")
    //.returning(["id", "name"])
    .insert([
      {
        id: userId,
        name: attrs.name,
        hash: user.hash,
        salt: user.salt,
        imagePath: attrs.imagePath
      }
    ])
    .on("query-response", function(response) {
      return 1;
    })
    .catch(function(error) {
      //console.log("error", error);
      //TODO: add error handling later
      return 0;
    });
}

export async function listUsers(query, options = {}) {
  let result = DBconnection.select("user.id", "user.name", "email.email")
    .from("user")
    .innerJoin("email", "user.id", "=", "email.userId");
}

export async function findUser(query, options = {}) {}

export async function updateUser(query, update, options = {}) {}

export async function deleteUser(query, options = {}) {}
