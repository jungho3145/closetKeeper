const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;
    let jwt_secret = "jwt-secret-key";

    req.decoded = jwt.verify(token, jwt_secret); // req.decoded에 decode된 사용자 정보 등록
    // console.log(req.decoded);
    return next(); // 다음으로 넘어감
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res.status(419).json({ success: false, message: "token 만료" }); // 토큰에 문제가 있을시 미들웨어에서 요청 처리 끝
    }
    return res
      .status(401)
      .json({ success: false, message: "token이 유효하지 않습니다." });
  }
};
