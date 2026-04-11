const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // Lọc trạng thái
  const filterStatus = filterStatusHelper(req.query);

  // Lọc sản phẩm
  let find = {
    deleted: true,
  };

  // Nếu có trạng thái thì thêm vào điều kiện tìm kiếm
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  //Pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    req.query,
    {
      currentPage: 1,
      limitItem: 4,
    },
    countProducts,
  );
  //EndPagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skipItem);

  res.render("admin/pages/recyle-bin/index", {
    pageTitle: "Danh sách sản phẩm đã xóa",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: false });
  
  req.flash('success', 'Khôi phục sản phẩm thành công');
  res.redirect(req.get("Referrer"));
}

module.exports.deleteItemForever = async (req, res) => {
  const id = req.params.id;

  await Product.deleteOne({ _id: id });
  
  req.flash('success', 'Xóa sản phẩm vĩnh viễn thành công');
  res.redirect(req.get("Referrer"));
}
