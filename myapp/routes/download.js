var express = require("express");
var router = express.Router();

const User = require("../models/User");
const Clothes = require("../models/Clothes");
const { verifyToken } = require("../middlewares/auth");
const multer = require("multer");
const Closet = require("../models/Closet");

const doAsync = (fn) => async (req, res, next) =>
  await fn(req, res, next).catch(next);

router.get(
  "/receiveData",
  verifyToken,
  doAsync(async (req, res, next) => {
    const user = await User.findOne({
      include: [
        {
          model: Clothes,
        },
      ],
      where: {
        email: req.decoded.email,
      },
    });
    if (user.Clothes) {
      res.json(user.Clothes);
    } else {
      res.json({ msg: "등록된 옷이 없습니다." });
    }
  })
);

router.get(
  "/receiveStatus",
  verifyToken,
  doAsync(async (req, res, next) => {
    const user = await User.findOne({
      where: {
        email: req.decoded.email,
      },
    });

    const closet = await Closet.findOne({
      where: {
        id: user.closet,
      },
    });

    console.log(closet.dataValues);

    if (closet.dataValues) {
      res.json(closet);
    } else {
      res.json({ msg: "등록된 옷장이 없습니다." });
    }
  })
);
module.exports = router;
