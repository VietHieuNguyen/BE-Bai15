const productsRoutes = require("./product.route");
const controller = require("../../controllers/client/home.controller");
module.exports = (app) => {
  app.get("/", controller.index);

  app.use("/products", productsRoutes);
};
