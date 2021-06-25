var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middlewares/auth");

// router.use(verifyToken);
/* GET home page. */
// router.get("/", verifyToken, async (req, res, next) => {
//   //미들웨어로 토큰 정보 확인
//   try {
//     res.json(req.decoded);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

module.exports = router;
