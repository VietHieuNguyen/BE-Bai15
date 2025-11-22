const express = require("express");
const multer  = require('multer')

const router = express.Router()

const controller = require("../../controllers/admin/product.controller")
const storageMulter = require("../../helpers/storageMulter")
const validate = require("../../validates/admin/product.validate")


const upload = multer({storage:storageMulter()})

router.get("/",controller.index)

router.patch("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-multi",controller.changeMulti)

router.delete("/delete/:id",controller.deleteItem)

router.get("/create",controller.create)
router.post("/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost)

module.exports = router;