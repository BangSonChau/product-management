const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  // Lọc trạng thái

  console.log(req.query);
  

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

  // Lọc sản phẩm
  let find = {
    deleted: false, 
  };

  // Nếu có trạng thái thì thêm vào điều kiện tìm kiếm
  if (req.query.status) {
    find.status = req.query.status;
  }

  // check keyword trong formSearch
  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;

    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
