var express = require("express");
var router = express.Router();

const doAsync = (fn) => async (req, res, next) =>
  await fn(req, res, next).catch(next);

const User = require("../models/User");
const Clothes = require("../models/Clothes");
const Closet = require("../models/Closet");
const { verifyToken } = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/sendData",
  verifyToken,
  upload.single("img"),
  doAsync(async (req, res, next) => {
    console.log(req.body);
    if (req.body.name && req.body.kind && req.body.materials && req.body.size) {
      //등록한 유저 검색
      const user = await User.findOne({
        where: {
          email: req.decoded.email,
        },
      });

      const clothes = await Clothes.create({
        name: req.body.name,
        kind: req.body.kind,
        materials: req.body.materials,
        size: req.body.size,
        img: req.file.path,
        owner: user.id,
      });

      res.status(200).json({ msg: "업로드 완료", clothes: clothes });
    } else {
      res.status(401).json({ msg: "불완전한 데이터" });
    }
  })
);

router.post(
  "/sendStatus",
  verifyToken,
  upload.none(),
  doAsync(async (req, res, next) => {
    if (req.body.temp && req.body.hum) {
      const user = await User.findOne({
        where: {
          email: req.decoded.email,
        },
      });

      const closet = await Closet.update(
        {
          temp: req.body.temp,
          Hum: req.body.hum,
        },
        {
          where: {
            id: user.closet,
          },
        }
      );

      res.status(200).json({ closet });
    } else {
      res.send({ msg: "불완전한 데이터" });
    }
  })
);

router.get(
  "/async_error",
  doAsync(async (req, res, next) => {
    throw new Error("Async 에러 발생!");
  })
);
module.exports = router;
