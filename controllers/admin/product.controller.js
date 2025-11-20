// [GET] /admin/products
const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus)
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      litmitItems: 4,
    },
    req.query,
    countProducts
  );

  // End Pagination

  const products = await Product.find(find)
    .sort({position: "desc"})
    .limit(objectPagination.litmitItems)
    .skip(objectPagination.skip);

  // console.log(products)

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id

const mongoose = require("mongoose");

module.exports.changeStatus = async (req, res) => {
  const { status, id } = req.params;
  const allowed = ["active", "inactive"];

  if (!allowed.includes(status) || !mongoose.isValidObjectId(id)) {
    res.redirect("back");
  }

  await Product.updateOne({ _id: id }, { status });

  const redirectUrl =
    req.get("Referrer") || req.app.locals.prefixAdmin + "/products";
  res.redirect(redirectUrl);
};
// [PATCH] /admin/products/change-status/:status/:id

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });

      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted:true,deletedAt:new Date() });
      break;
    case "change-position":
      for (const item of ids){
        let [id, position] = item.split("-")
        position = parseInt(position);
        await Product.updateOne({_id:id},{
          position:position
        })
      }
      break;
    default:
      break;
  }
  const redirectUrl =
    req.get("Referrer") || req.app.locals.prefixAdmin + "/products";
  res.redirect(redirectUrl);
};

// [DELETE] /admin/prodcuts/delete/:id
module.exports.deleteItem = async(req,res) =>{
  const id = req.params.id;

  // await Product.deleteOne({_id:id})
  await Product.updateOne({_id:id},{deleted:true, deletedAt: new Date()})
  const redirectUrl =
    req.get("Referrer") || req.app.locals.prefixAdmin + "/products";
  res.redirect(redirectUrl);
}