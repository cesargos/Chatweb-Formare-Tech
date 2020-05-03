const mongoose = require('mongoose');
const User = mongoose.model('User');
const generateUsers = require('./JSON117Usuarios');

module.exports = {

  //procura participante por nome
  async userName(req,res){ 
    const user = await User.find({name:req.query.name});
    return res.json(user);
  },

  //retorna os participantes do site
  async users(req,res){
    let user = await User.find().sort({name: 1});

    if (user.length < 117){
      user = user.concat(generateUsers).filter((e,i)=>i<117);
    }
    
    return res.json(user);
  },  

  //cria novo participante no site
  async newUser(req,res){
    const user = await User.create(req.body);
    return res.json(user);
  }
};
