const productsHelper = require("../../helpers/products");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsCategoryHelper = require("../../helpers/product-category")
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

// [GET] /products/detail:slugCategory
module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false,
  });
  
  const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
  
  const listSubCategoryId = listSubCategory.map(item=>item.id)


  const products = await Product.find({
    product_category_id: {$in:[category.id, ...listSubCategoryId]},
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });
  
  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: newProducts,
  });
};
