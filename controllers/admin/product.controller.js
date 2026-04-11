const Product = require("../../models/product.model");

const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helpers/filter-status");
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
    .sort({ position: "desc" })
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

  req.flash("success", "Cập nhật trạng thái sản phẩm thành công");

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
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm`,
      );
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm`,
      );
      break;

    case "delete-all":
      //xóa mềm
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm`);
      break;

    case "change-position":
      for (const item of ids) {
        let [id, postion] = item.split("-");

        postion = parseInt(postion);

        await Product.updateOne({ _id: id }, { position: postion });
        req.flash(
          "success",
          `Cập nhật vị trí thành công ${ids.length} sản phẩm`,
        );
      }
      break;

    default:
      break;
  }

  //redirect về trang danh sách sản phẩm
  res.redirect(req.get("Referrer"));
};

// [DELETE] /admin/products/delete/:id
// Xóa cứng
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });

  // Xóa mềm
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() },
  );
  req.flash("success", "Xóa sản phẩm thành công");
  res.redirect(req.get("Referrer"));
};

// [GET] /admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  // Chuyển đổi dữ liệu về đúng kiểu dữ liệu (number)
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  // Set vị trí mới
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();

    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.thumbnail = `/uploads/${req.file.filename}`;

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
