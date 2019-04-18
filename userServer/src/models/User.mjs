import { DBconnection } from "../db/db";
import uuidv4 from "uuid/v4";
import { auth, genHash } from "./Utils";
import util from "util";

export async function createUser(attrs, options = {}) {
  console.log("!--------------------------!");

  //1. check user name
  const checkUser = await listUsers({ name: attrs.name });
  console.log(
    "=>>>>>>>>>>>>>>>>>>>>>>",
    checkUser,
    "=========length",
    checkUser.length,
    "name",
    attrs.name
  );
  if (checkUser.length != 0) {
    return {
      result: 0,
      msg: "user name already been taken"
    };
  }
  //2. check email
  const checkEmail = await listUsers({ email: attrs.email });
  if (checkEmail.length != 0) {
    return {
      result: 0,
      msg: "email already used"
    };
  }

  let userId = uuidv4();
  let emailId = uuidv4();
  let user = await genHash({ password: attrs.password });

  DBconnection("user")
    .insert([
      {
        userId: userId,
        name: attrs.name,
        hash: user.hash,
        salt: user.salt,
        imagePath: attrs.imagePath
      }
    ])
    .then(() => {
      DBconnection("email")
        .insert([
          {
            emailId: emailId,
            email: attrs.email,
            verified: 0,
            primary: 1,
            userID: userId
          }
        ])
        .then(function(response) {
          return {
            result: 1,
            msg: response
          };
        })
        .catch(function(error) {
          console.log("error", error);
          //TODO: add error handling later
          return {
            result: 0,
            msg: "insert email failed"
          };
        });
    })
    .catch(function(error) {
      console.log("error", error);
      //TODO: add error handling later
      return {
        result: 0,
        msg: "insert user failed"
      };
    });
}

export async function listUsers(query, options = {}) {
  let data = await new Promise((resolve, reject) => {
    DBconnection("userFull")
      .select("*")
      .where(query)
      .then(rows => {
        //console.log(rows);
        resolve(rows);
      })
      .catch(function(error) {
        //console.log("error", error);
        //TODO: add error handling later
        return reject(error);
      });
  });
  return data;
}

export async function findUser(query, options = {}) {
  console.log("finduser called");
  let data = await new Promise((resolve, reject) => {
    DBconnection("userFull")
      .select("*")
      .where(query)
      .then(rows => {
        //console.log(rows);
        resolve(rows);
      })
      .catch(function(error) {
        //console.log("error", error);
        //TODO: add error handling later
        return reject(error);
      });
  });
  return data;
}

export async function updateUser(query, update, options = {}) {}

export async function deleteUser(query, options = {}) {}
