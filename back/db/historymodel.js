const mongoose = require("mongoose");

const historyschema = mongoose.Schema(
  {
  
    amount: {
      type: Number,
      required: true,
    },
    discount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coupon'
    }
  },
  { timestamps: true }
);

module.exports = new mongoose.model("History", historyschema);
