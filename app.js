const express = require("express");
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts.route");
const signupRouter = require("./routes/signup.route");

const cookieParser = require("cookie-parser");

//connect();
// 전역객체 body parser에 사용

// 미들웨어

app.use(express.json());
app.use(cookieParser());
app.use("/api", [postsRouter, signupRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
