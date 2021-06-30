var express = require("express");
var router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth");
const Closet = require("../models/Closet");
const multer = require("multer");
var upload = multer();

/* GET users listing. */
router.post("/signup", upload.none(), async (req, res, next) => {
  console.log(req.body);
  if (req.body.email && req.body.password && req.body.name) {
    const data = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (data[0]) {
      console.log("해당 유저가 존재!");
      res.send({ error: "이미 존재하는 이메일" });
    } else {
      const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      console.log("회원가입 완료");
      //회원가입 완료후 토큰 생성
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        "jwt-secret-key",
        {
          expiresIn: "7d",
        }
      );
      res.json({ token });
    }
  } else {
    res.send({ msg: "불완전한 데이터" });
  }
});

router.post("/login", upload.none(), async (req, res, next) => {
  console.log(req.body);
  try {
    //해당 정보가 맞는지 검사
    passport.authenticate("local", (passportError, user, info) => {
      if (passportError || !user) {
        // 정보가 맞다면 유저 정보를 반환해야함
        res.status(400).json({ message: info.reason });
        return;
      } // 그냥 로그인으로 바꿔도 되지 않을까?

      //맞다면 토큰 생성
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        "jwt-secret-key",
        { expiresIn: "7d" }
      );
      res.json({ token });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/addCloset",
  upload.none(),
  verifyToken,
  async (req, res, next) => {
    if (req.body.temp && req.body.hum) {
      const user = await User.findOne({
        where: {
          email: req.decoded.email,
        },
      });

      if (user.closet) {
        res.send({ msg: "이미 옷장이 등록됨!" });
        return;
      }

      const closet = await Closet.create({
        temp: req.body.temp,
        Hum: req.body.hum,
      });

      console.log(closet);

      const user2 = await User.update(
        {
          closet: closet.id,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.json(user2);
    } else {
      res.status(401).json({ msg: "불완전한 데이터" });
    }
  }
);

module.exports = router;
