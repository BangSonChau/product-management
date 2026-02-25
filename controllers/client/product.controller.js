const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

  const products = await Product.find({
    // Bộ lọc các sản phẩm có trường
    status: "active",
    deleted: false
  });

  const newProducts = products.map(item => {
    item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(2);
    return item;
  })


  console.log(newProducts);
  
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts
  });
}