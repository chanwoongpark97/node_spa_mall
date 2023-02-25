const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// 장바구니 조회 API
// localhost:3000/api/carts GET Method
router.get("/carts", async(req,res) =>{
    const carts = await Cart.find({}); // 1. 장바구니에 있는 모든 데이터 찾기
    // [
    // {goodId, quantity},
    // {goodId, quantity},
    // ];
    // 2. 그 장바구니 안에 있는 모든 상품에 대한 아이디를 찾기
    const goodsIds = carts.map((cart) =>{
        return cart.goodsId;
    })
    // [2, 11, 19];
    // 3. 그 상품의 아이디를 통해서 해당 상품들에 대한 상세 정보를 가져옴
    const goods = await Goods.find({goodsid: goodsIds});

    // 4. Goods에 해당하는 모든 정보를 가지고 올건데,
    // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회하라.
    const results = carts.map((cart) => {
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item) => item.goodsId === cart.goodsId),
        }
    })

    res.json({
        "carts": results,
    })

});

module.exports = router;