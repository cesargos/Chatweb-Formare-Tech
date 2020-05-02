import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import api from '../../services/api'


import './styles.css';
import * as userActions from "../../store/actions/user";


const pageLogin = ({user, setLoginUser,setConsultor, setPassword,login }) => {
  const setLogin = async () =>{
    const id = await searchUser(user.userName);
    if(id) login(user,id);
  
  }
  






  return (

    <div className='login'>
      <h1>CHATWEB</h1>
      <p>
        Nome de Usuário: 
        <input type="text" className="edit" value={user.userName} 
          onChange={(e)=>setLoginUser(e.target.value)} />
      </p>
      <p>  

        <input className='checkbox' type="checkbox" checked={user.consultor} 
          onChange={(e)=>setConsultor(e.target.checked)}/>
        Entrar como Consultor
      </p>
     {user.consultor?<p>
        Senha: <input type="text" className="edit" value={user.password} 
          onChange={(e) => setPassword(e.target.value)} />
      </p>:''}
     <p id='error'>{user.error}</p>
      <button onClick={() => setLogin()}>Entrar</button>

     </div>
  )

};

const mapStateToProps = state => ({
  user:state.user 
});


const mapDispatchToProps = dispatch =>
   bindActionCreators(userActions,dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(pageLogin);



const searchUser = async (userName)=>{

  if(!userName) return ;
  let userResponse = await api.get(`/users/user?name=${userName}`);
  if (userResponse.statusText==='OK'){
    if(userResponse.data[0]){
      return userResponse.data[0]._id;
    }
    else{
        userResponse = await  api.post('/users',{name:userName});
        if (userResponse.data._id){
          return userResponse.data._id;
        }
        else{
          alert('Erro ao cadastrar novo usuário!');
          console.log(userResponse);
        }
    }
  }
  else{
    alert("Erro ao carregar carregar usuário no servidor!");
    console.log(userResponse);
  }
  return ;
  }



























/*

function novoUser(){
  dispatch({type:'LOGIN',userID:'novo id',userName:'novo usuario'})
}



function logar(){
  if (chats.userName){
    if (chats.userName.length>2){
      if (chats.checked){
        if (chats.userName==='Consultor'&&password==='1234'){
          //entrar como consultor de uma maneira facil e pouco segura
          dispatch({type:'LOGIN',userID:'0000',login:true,consultor:true});
          
        }
        else{
          alert('Login ou senha do Consultor Incorretos!')
        }
      }
      else{
        //logar como usuário normal
        dispatch({type:'LOGIN',userID:'0000',login:true,consultor:false});
        ;         
      }
    }
    else{
      alert('Nome de usuário muito curto!');
    }
  }
  else{
    alert('Digite o nome do usuário!')
  }
}
*/