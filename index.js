const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");

require("dotenv").config();

const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình thư mục chứa file view và template engine (PUG)
app.set("views", "./views");
app.set("view engine", "pug");

// App local variables (app.locals) để lưu trữ các biến toàn cục
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Cấu hình thư mục chứa file tĩnh (CSS, JS, hình ảnh)
app.use(express.static("public"));

//Routes
route(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
