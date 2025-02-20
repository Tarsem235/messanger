const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      require:true,
    },
    receiverId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      require:true,
    },
    message:{
      type:String,
      require:true,
      maxlength:1000,
      trim:true,
      validate:[
        {
          validator:(value) => value.length > 0 ,
          message:'message cannot be empty'
        },
      ],
    },
    createdAt: {type: Date , default:Date.now},
  },{
    timestamp:true,
  }
)
const message =  mongoose.model("Message",messageSchema);
module.exports = message;