const express = require("express");
const multer  = require('multer')
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const router = express.Router()

const upload = multer()
const controller = require("../../controllers/admin/setting.controller")

router.get("/general", controller.general);

router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
)
module.exports = router;
 