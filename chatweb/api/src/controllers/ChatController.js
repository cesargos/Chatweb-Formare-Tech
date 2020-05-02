const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');


module.exports = {

  //retorna toda a conversa do chat
  async index(req, res){

    //valores padrão para receber 1 e -1, sujeito a erros 
    const order = parseInt(req.query.order) || 1;

    //formato da data do query aaaa-mm-dd
    const initialDate = req.query.initialDate?new Date(req.query.initialDate).getTime():0;
    const endDate = req.query.endDate? new Date(req.query.endDate).getTime():Date.now();

    //faz a pesquisa filtrando - Ver forma mais inteligente de fazer isso
    let chat;
    if(req.query.userName){
      const {userName} = req.query;
      chat = await Chat.find({$and:[{userName},{dataHora:{$gte: initialDate}},{dataHora:{$lte: endDate}}]}).sort({dataHora: order});//-1para decrescente
    }  
    else{
      chat = await Chat.find({$and:[{dataHora:{$gte: initialDate}},{dataHora:{$lte: endDate}}]}).sort({dataHora: order});  
    }
   
    return res.json(chat);
  },

  //adiciona nova mensagem no site
  async store(req,res){
    const chat = await Chat.create(req.body);
    return res.json(chat);
  },

  //deleta a mensagem do chat
  async destroy(req, res){
    await Chat.findByIdAndRemove(req.params.id);
    return res.send('OK');
  },
  
};