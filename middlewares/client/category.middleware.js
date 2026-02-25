const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createtTree");

module.exports.category = async (req, res, next) => {
  let find = {
    deleted: false,
  };
  const productCategory = await ProductCategory.find(find);
  const newProductCategory = createTreeHelper.tree(productCategory);
  res.locals.layoutProductCategory = newProductCategory;
  next();
};
