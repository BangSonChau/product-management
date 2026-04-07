const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  // Lọc trạng thái
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus);

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

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
