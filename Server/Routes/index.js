const AuthRoutes = require("./Auth");

module.exports = (app) => {
  app.use("/api/auth", AuthRoutes);
};
