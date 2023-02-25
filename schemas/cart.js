const mongoose = require("mongoose");

// 장바구니 모델 작성
// 어떤 상품을 담았고, 몇개를 담았는지 설정
const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Cart", cartSchema);