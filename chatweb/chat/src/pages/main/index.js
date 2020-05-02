import React from 'react';
import {useSelector,useDispatch} from 'react-redux';

import api from '../../services/api';
import Header from '../../components/Header';
import MsgSender from '../../components/MsgSender';
import Research from '../../components/Research';
import './styles.css';


let load = false;


const Main = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const loadChat = async () =>{
    const chatResponse = await api.get(`/chat`);
    
    if (chatResponse.statusText==='OK'){
      dispatch({type:'LOAD_CHAT',msgs:chatResponse.data});
    }
    else{
      alert("Erro ao carregar as mensagens do chat!");
      console.log(chatResponse);
    }
    return true;
  };

const deleteMsg = async (id) =>{
  const msgs = state.chat.msgs.filter((e)=> e._id!==id);  
  const response = await api.delete(`/chat/${id}`);
  if (response.data==='OK'){
    dispatch({type:'DEL_MSG',msgs});
  }
  else{
    alert("Erro ao deletar mensagem no servidor!");
    console.log(response);
  }
}

  //Usado para nao correr o risco de carragar todas as msg mais de uma vez causando lentidão
  if (!load) load = loadChat();

  return (
      <>
  <Header />
  {state.user.consultor?<Research />:''}
  <div className={state.user.consultor?"chat-list":"chat-list central"}>
      {state.chat.msgs.map(chat => (
      <article key={chat._id}>
        <div>
          <span className='cabecalho-msg'>
            {new Date(chat.dataHora).toLocaleDateString()+' - '}
            <strong>{chat.userName}</strong>
            {' - '+chat.dataHora.slice(11,16)}
            <strong>  => </strong>
          </span>
          <span className='msg'>  {chat.msg}</span>
        </div>
        <div>
          {state.user.consultor?
            <button className='btnExcluir' onClick={()=>deleteMsg(chat._id)}>Excluir</button>:''}
        </div>
      </article>
      ))}
  </div>
  <MsgSender />
  </>
  )
};

export default Main;

