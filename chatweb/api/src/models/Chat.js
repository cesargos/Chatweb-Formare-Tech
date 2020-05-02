const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ChatSchema =  new mongoose.Schema({
  userName:{
    type:String,
    required:true,
  },
  dataHora:{
    type:Date,
    default:() => Date.now()-10800000,
  },
  msg:{
    type:String,
    required:true,
  },
  _idUser:{
    type:String,
    required:true,
  }
});

ChatSchema.plugin(mongoosePaginate);

mongoose.model('Chat',ChatSchema);