const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//inicia o app
const app = express();
app.use(express.json());

//libera acesso para todos os domínios 
app.use(cors());

//Inicia o DB
mongoose.connect('mongodb://localhost:27017/chat',{useNewUrlParser:true});

requireDir('./src/models');


//primeira rota
app.use("/api",require('./src/routes'));

app.listen(3001); 