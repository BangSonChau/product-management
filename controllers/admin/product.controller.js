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
    deleted: false,
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

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  //Cập nhật trạng thái của sản phẩm có id
  await Product.updateOne({ _id: id }, { status: status });

  //redirect về trang danh sách sản phẩm
  res.redirect(req.get("Referrer"));
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const status = req.body.type;
  const ids = req.body.ids.split(", ");

  //update
  switch (status) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;

    default:
      break;
  }

  //redirect về trang danh sách sản phẩm
  res.redirect(req.get("Referrer"));
};
