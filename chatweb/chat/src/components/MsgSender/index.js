import React from 'react';
import "./styles.css";
import api from "../../services/api";
import {useSelector,useDispatch} from 'react-redux';

export default function MsgSender(){
 const state = useSelector(state => state);
  const dispatch = useDispatch();
 
  function setNewMsg(newMsg){
    if(newMsg === '\n' ) return;
    if (newMsg.length > 2) {
      if( newMsg[newMsg.length-1] === '\n' && newMsg[newMsg.length-2]==='\n'){
        return;
      }
    }
     dispatch({type:'SET_NEWMSG',newMsg});
  }
  const sendMsg = async () => {
    if (state.chat.newMsg){
      
      let newMsg = {
        msg: state.chat.newMsg,
        userName: state.user.userName,
        _idUser: state.user.userID,
      }
      const response = await api.post('/chat',newMsg);
      if (response.statusText !=="OK"){
        alert("Error ao enviar a mensagem!");
        console.log(response)
        return;
      }
      newMsg = response.data;
      dispatch({type:'ADD_NEWMSG',newMsg});
    }
    
  }
  return (   
    <footer className="msg-sender">  
        <div><p>Mensagem:</p></div>               
        <textarea placeholder="Digite sua mensagem aqui." value={state.chat.newMsg}
        className='msg-field' type='text' onChange={(e) => setNewMsg(e.target.value)} />      
      <button className='btn-send' onClick={sendMsg}>Enviar</button>        

    </footer>
  ); 
}