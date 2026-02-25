const productsHelper = require("../../helpers/products");
const Product = require("../../models/product.model");

// [GET] /products

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
    pageTitle: "Trang chủ sản phẩm",
    products: newProducts,
  });
};

// [GET] /products/detail:slug
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    slug: req.params.slug,
    status: "active",
  };
  const product = await Product.findOne(find);

  res.render("client/pages/products/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product,
  });
};
