import React from 'react';
import "./styles.css";
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

export default function Header(){
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function logout(){
    dispatch({type:'LOGOUT'});
  }

  return (   
    <header className="main-header">
      <div>
        {user.consultor?<><Link to='/'>Chat</Link>
        <Link to='/users'>Usuários</Link></>:''}
      </div>
      <div>
        Olá, <span>{user.userName}!</span>  
        <button className='btn-logout' onClick={logout}>Logout</button>
      </div>
    </header>
  ); 
}
