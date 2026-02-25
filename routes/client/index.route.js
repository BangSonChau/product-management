const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");

module.exports = (app) => {
  app.use("/", homeRoutes);

  // Sử dụng router cho các route liên quan đến sản phẩm
  app.use("/products", productRoutes);
};
