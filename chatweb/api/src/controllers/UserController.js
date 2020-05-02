const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = {

  //procura participante por nome
  async userName(req,res){ 
   //if(!req.query.name) return res.json({error:"usuario nao encontrado"});
    const user = await User.find({name:req.query.name});
    return res.json(user);
  },

  //retorna os participantes do site
  async users(req,res){
    const user = await User.find().sort({name: 1});
    return res.json(user);
  },  

  //cria novo participante no site
  async newUser(req,res){
    const user = await User.create(req.body);
    return res.json(user);
  }
};