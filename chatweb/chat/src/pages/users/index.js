import React, {Component} from 'react';
import api from '../../services/api';
import Header from '../../components/Header';

import './styles.css';


export default class Users extends Component{
state = {
  qtGrupos:'',
  users:[],
  users2:'',
  agrupar:false,
}

  componentDidMount(){
    this.loadChat();
  }

  loadChat = async () =>{
    const response = await api.get(`/users`);
    this.setState({users:response.data});
  };

  addGrupos(){
    let ng = [...this.state.users];
    ng = ng.map((e)=>{
      return {...e,grupo:1}
    })
    return ng;
    }
  

  agruparGrupos = ()=>{
    console.log('agrupar grupos',Math.random(),this.state);
    let userWithGroup = this.addGrupos();   
    const qtGrupos = parseInt(this.state.qtGrupos);
    userWithGroup = userWithGroup.map((e,i)=>{
      return {...e,grupo:i%qtGrupos}
      //faltando randomizar e  reagrupar usando mod%

    })
    
    
    this.setState({users:userWithGroup,agrupar:true})
  };


  render(){
 const {users} = this.state
  return (
    <>
    
    <Header />
    <div className="user-list">
      
      {this.state.agrupar?

        users.map(user => (
          <article key={user._id}>
            Name:<span className='userName'> {user.name}</span>
            grupo:<span className='userName'> {user.grupo}</span>
            <div className='user-info'>
              <p>ID:<strong> {user._id}</strong></p>
              <p>Criado em: <strong>{new Date(user.createdAt).toLocaleString()}</strong></p>
            </div>
            </article>
          ))
      
      :users.map(user => (
      <article key={user._id}>
        Name:<span className='userName'> {user.name}</span>

        <div className='user-info'>
          <p>ID:<strong> {user._id}</strong></p>
          <p>Criado em: <strong>{new Date(user.createdAt).toLocaleString()}</strong></p>
        </div>
        </article>
      ))}
    </div>
    <footer className='agrupar'>
      <p>Agrupar usuários aleatoriamente em:            
        <select className="qt-grupo" id='comboBox' value={this.state.qtGrupos} 
        onChange={(e) => this.setState({qtGrupos:e.target.value})}>
          <option >Individualmente</option>
          <option value='2'>2 grupos</option>
          <option value='3'>3 grupos</option>
          <option value='4'>4 grupos</option>
          <option value='5'>5 grupos</option>
          <option value='6'>6 grupos</option>
          <option value='7'>7 grupos</option>
          <option value='8'>8 grupos</option>
        </select></p>   
      <button className='btn-agrupar' onClick={this.agruparGrupos} >Agrupar</button>        

    </footer>
    </>
  )

  
  }
}
