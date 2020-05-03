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
    <>
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
      <p>Login: Consultor, Senha:1234 para entrar como consultor.</p>
     </>
  )
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


