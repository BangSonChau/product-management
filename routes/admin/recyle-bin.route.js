const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/recyle-bin.controller"); ;

router.get("/", controller.index);

router.patch("/restore/:id", controller.restoreItem);

router.delete("/delete/:id", controller.deleteItemForever);

module.exports = router;