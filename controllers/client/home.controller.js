const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products")
// [GET] /
module.exports.index = async (req, res) => {
  // Lấy sản phẩm nổi bật
  let find = {
    deleted: false,
    featured: "1",
    status: "active",
  };
  
  const productsFeatured = await Product.find(find);
  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured)



  // Lấy sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status: "active",

  }).sort({position: "desc"}).limit(6)
  const newProductsNew = productsHelper.priceNewProducts(productsNew)
  // Hết lấy sản phẩm mới nhất

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  });
};
