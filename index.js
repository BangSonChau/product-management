const express = require("express");
require("dotenv").config();

const route = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

// Cấu hình thư mục chứa file view và template engine (PUG)
app.set("views", "./views");
app.set("view engine", "pug");

//Routes
route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
