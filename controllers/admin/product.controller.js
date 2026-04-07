const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // Lọc trạng thái
  const filterStatus = filterStatusHelper(req.query);

  // Lọc sản phẩm
  let find = {
    deleted: false,
  };

  // Nếu có trạng thái thì thêm vào điều kiện tìm kiếm
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);
  console.log(objectSearch);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  //Pagination
  let objectPagination = {
    currentPage: 1,
    limitItem: 4,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  console.log(objectPagination.currentPage);

  objectPagination.skipItem =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;
  //EndPagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skipItem);

  const countProducts = await Product.countDocuments(find);

  const totalPage = Math.ceil(countProducts / objectPagination.limitItem);

  objectPagination.totalPage = totalPage;

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

