const indexR = require("./index");
const usersR = require("./users");
const arcticleR=require("./arcticle")


exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/articles", arcticleR);
}

