module.exports.createPost = async (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Tiêu đề sản phẩm không được để trống");
    res.redirect(req.get("Referrer"));
    return;
  }
  
  next();
};
