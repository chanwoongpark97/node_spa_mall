const mongoose = require("mongoose");

// 상품 모델 작성
const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String
  },
  price: {
    type: Number,
  }
});

module.exports = mongoose.model("Goods", goodsSchema);