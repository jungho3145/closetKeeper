var express = require("express");
const path= require('path');
var router = express.Router();
const { verifyToken } = require("../middlewares/auth");

// router.use(verifyToken);
/* GET home page. */

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

module.exports = router;
