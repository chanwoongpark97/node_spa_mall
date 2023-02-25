const express = require("express");
const cart = require("../schemas/cart.js");
const router = express.Router();

// /routes/goods.js
// 상품 목록 리스트
const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

//상품 목록 조회 API
router.get("/goods", (req, res) => {
  res.json({ goods: goods });
});

//상품 상세 조회 API
router.get("/goods/:goodsId", (req, res) => {
const { goodsId } = req.params;
        
  // 첫번째 방법 (구버전이라 코드가 조금 다르나 형태는 동일)
  // let result = null;
  // for(const good of goods) {
  //     if(Number(goodsId) === good.goodsId) {
  //         result = good;
  //     }
  // }

// 두번째 방법 (수정안)
const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId));
  res.json({ detail });
});

// 장바구니에 상품 추가 API
const Cart = require("../schemas/cart.js")
router.post("/goods/:goodsId/cart", async(req, res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existCarts = await Cart.find({goodsId});
  if (existCarts.length) {
    return res.status(400).json({
      success:false,
      errorMessage:"이미 장바구니에 해당하는 상품이 존재합니다.",
    });
  }

  await Cart.create({goodsId, quantity});

  res.json({result: "success"});
});

// 장바구니의 상품 수량 수정 API
router.put("/goods/:goodsId/cart", async(req, res) =>{
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existCarts = await Cart.find({goodsId});
  if(existCarts.length) {
    await Cart.updateOne(
      {goodsId: goodsId},
      {$set: {quantity:quantity}}
    )
  }

  res.status(200).json({success:true});
});

// 장바구니의 상품 수량 수정 API에서 수량을 1미만으로 정했을때 400 오류 뜨게 하기 (퀴즈 추가 내용)
// router.put("/goods/:goodsId/cart", async (req, res) => {
//   const { goodsId } = req.params;
//   const { quantity } = req.body;

//   if (quantity < 1) {
//     res.status(400).json({ errorMessage: "수량은 1 이상이어야 합니다." });
//     return;
//   }

//   const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
//   if (existsCarts.length) {
//     await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
//   }

//   res.json({ success: true });
// });

// 장바구니의 상품 제거 API
router.delete("/goods/:goodsId/cart", async(req, res) => {
  const {goodsId} = req.params;

  const existCarts = await Cart.find({goodsId});
  if(existCarts.length) {
    await Cart.deleteOne({goodsId});
  }

  res.json({result:"success"});
});


// 상품 생성 API
const Goods = require("../schemas/goods.js");
router.post("/goods/", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });

  if (goods.length) {
    return res.status(400).json({
      success: false, 
      errorMessage: "이미 있는 데이터입니다."
    });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

module.exports = router;
