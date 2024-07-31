const express = require('express')
const router = express.Router();
const { getAllItems, createItems } = require("../controllers/main")


router.route("/").post(createItems).get(getAllItems)


module.exports = router