const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  // Lọc trạng thái
  let filterStatus = [
    {
      name: "tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (iitem) => iitem.status === req.query.status,
    );
    filterStatus[index].class = "active";
  } else {
    filterStatus[0].class = "active";
  }

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Lọc sản phẩm
  let find = {
    deleted: false,
  };

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
  });
};
