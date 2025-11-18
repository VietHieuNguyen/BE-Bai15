// [GET] /admin/products
const Product = require("../../models/product.model")

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search")


module.exports.index = async(req,res) =>{
  
  const filterStatus = filterStatusHelper(req.query);
  console.log(filterStatus)
  let find={
    deleted: false,
  }
  if(req.query.status){
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }
// Pagination
  let objectPagination = {
    currentPage: 1,
    litmitItems:4
  }

  if(req.query.page){
    objectPagination.currentPage= parseInt(req.query.page);
  }
  objectPagination.skip = (objectPagination.currentPage -1)*objectPagination.litmitItems

  const countProducts =await Product.countDocuments(find)
  const totalPage = Math.ceil(countProducts/objectPagination.litmitItems)
  objectPagination.totalPage = totalPage;


// End Pagination 


  const products = await Product.find(find).limit(objectPagination.litmitItems).skip(objectPagination.skip)

  console.log(products)

  res.render("admin/pages/products/index",{
    pageTitle:"Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}

