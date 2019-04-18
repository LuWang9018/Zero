import { requireAuth } from "./auth";
import * as User from "../models/User";

async function getUser(ctx, next) {
  const { id } = ctx.params;
  const user = await User.findUser({ id });
  ctx.state.user = user;
  await next();
}

async function createUser(ctx, next) {
  const data = ctx.request.body;
  const user = await User.createUser(data);
  ctx.state.user = user;
  await next();
}

async function listUsers(ctx, next) {
  const query = ctx.request.query;
  const users = await User.listUsers(query);
  ctx.state.user = users;
  await next();
}

async function updateUser(ctx, next) {
  const data = ctx.request.body;
  const { id } = ctx.params;
  const user = User.updateUser({ id }, data);
  ctx.state.user = user;
  await next();
}

async function deleteUser(ctx, next) {
  const { id } = ctx.params;
  const user = User.deleteUser({ id }, data);
  ctx.state.user = user;
  await next();
}

async function outputUser(ctx) {
  if (ctx.state.user) {
    ctx.body = ctx.state.user;
  } else {
    //TODO: CATCH ERROR
    ctx.status = 404;
  }
}

const api = router => {
  router.get("/api/users/:id", requireAuth("read"), getUser, outputUser);
  router.get("/api/users", requireAuth("read"), listUsers, outputUser);
  router.post("/api/users", createUser, outputUser);
  router.put("/api/users/:id", requireAuth("update"), updateUser, outputUser);
  router.del("/api/users/:id", requireAuth("delete"), deleteUser, outputUser);
};

export default { api };
