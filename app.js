const express = require('express');
const app = express();
const port = 3000;

// 라우터 연결
const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");

// 웹 서버에서 MongoDB에 연결
const connect = require("./schemas");
connect();

app.use(express.json());
// localhost:3000/api -> goodsRouter, cartsRouter
app.use("/api", [goodsRouter, cartsRouter]);

// app.post("/", (req,res) => {
//   console.log(req.body);

//   res.send("URI에 POST 메소드가 정상적으로 실행되었습니다.");
// });

// app.get("/", (req,res) => {
//   console.log(req.query);
  // 첫번째 방법
  // const obj = {
  //   "KeyKey" : "value 입니다.",
  //   "이름입니다.":"이름일까요?",
  // }
  
  // 두번째 방법
  // res.json({
  //   "KeyKey" : "value 입니다.",
  //   "이름입니다.":"이름일까요?",
  // });

  // 요청 실패 했을 때
//   res.status(400).json({
//     "KeyKey" : "value 입니다.",
//     "이름입니다.":"이름일까요?",
//   });
// });

// app.get("/:id", (req,res) => {
//   console.log(req.params);

//   res.send(": id URI에 정상적으로 반환되었습니다.");
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
