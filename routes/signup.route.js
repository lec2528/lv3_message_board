const express = require("express");

const router = express.Router();
const { signUps } = require("../models");

const loginmiddleware = require("../Middleware/loginmiddleware.js");
//const userinfos = require("../models/userinfos");

//내 정보조회 api
router.get("/signups/me", loginmiddleware, async (req, res) => {
  const { nickName } = res.locals.signin;
  const { userId } = res.locals.signin;
  console.log(userId);
  res.status(200).json({
    signups: { nickName },
  });
});

//회원가입 api
router.post("/signUps", async (req, res) => {
  const { nickName, passWord, confirmPassword } = req.body;
  console.log(nickName)

  const existUser = await signUps.findOne({ where: { nickName }})
console.log(existUser)

  if (!existUser.match(/^[a-zA-Z0-9]{3,50}$/)) {
    res.status(412).json({
      errorMessage:
        "닉네임은 영어와 숫자만 포함한 3자리 이상 50자리 아하의 문자로 입력해주세요.",
    });
    return;
  }
  if (existUser) {
    res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
    return;
  }
  if (passWord !== confirmPassword) {
    res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." });
    return;
  }
  if (passWord.length < 4) {
    res
      .status(412)
      .json({ errorMessage: "비밀번호는 4자리 이상 입력해주세요." });
    return;
  }

  // 수정 필요
  //   if (!passWord.match(/^[$(nickName)]$/)) {
  //     res
  //       .status(412)
  //       .json({ errorMessage: "비밀번호에 닉네임이 포함될 수 없습니다." });
  //     return;
  //   }

  await Signup.create({ nickName, passWord });

  res.status(201).json({ message: "회원 가입에 성공하였습니다." });

});


router.post("/login", async (req, res) => {
  const { nickName, passWord } = req.body;

  const signIn = await signUps.findOne({ nickName });
  if (!signIn || passWord !== signIn.passWord) {
    res.status(412).json({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요 ",
    });
    return;
  }

  // 로그인시 쿠키 생성
  const token = jwt.sign({ signIn }, "custom-secret-key");
  res.cookie("Authorization", `Bearer ${token}`);
  res
    .status(200)
    .json({
      token,
      success: `안녕하세요${nickName}님 오늘도 행복한 하루 되세요!`,
    });
});

module.exports = router;
