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
    let response = await api.get(`/users`);
    response.data.sort((a, b) => ((a.name.toUpperCase() > b.name.toUpperCase()) ? 
        1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0)));



    this.setState({users:response.data});
  };


  agruparGrupos = ()=>{
    console.log('agrupar grupos',Math.random(),this.state);
    //let userWithGroup = this.addGrupos();   
    const qtGrupos = parseInt(this.state.qtGrupos);
    let novoUsers = [...this.state.users];


    novoUsers = this.state.users.map((e,i) => {
      const indice = Math.floor(Math.random()*novoUsers.length); 
      const user = novoUsers.splice(indice,1);
      return({...user[0],grupo:(i%qtGrupos)+1});      
    });



      novoUsers.sort((a, b) => ((a.name.toUpperCase() > b.name.toUpperCase()) ? 
        1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0)));
      novoUsers.sort((a, b) => ((a.grupo > b.grupo) ? 
        1 : ((b.grupo > a.grupo) ? -1 : 0)));



    this.setState({users:novoUsers,agrupar:!!(qtGrupos-1)})
  };


  render(){
    const {users} = this.state
    let loop = []
    for(let i=0; i<parseInt(this.state.qtGrupos); i++){
      loop.push(i)}
  return (
    <>
    
    <Header />
    <div className="user-list">
      {( this.state.agrupar)?
        loop.map((e,i)=>(
          <article key={i}>
            <h1>Grupo {i+1}</h1>
            {users.filter((user)=>user.grupo===(i+1)).map(user => (
              <article key={user._id}>

                Name:<span className='userName'> {user.name}</span><br />
                grupo:<span className='userName'> {user.grupo}</span>
                <div className='user-info'>
                  <p>ID:<strong> {user._id}</strong></p>
                  <p>Criado em: <strong>{new Date(user.createdAt).toLocaleString()}</strong></p>
                </div>
              </article>
            ))}
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
        onChange={(e) => this.setState({qtGrupos:e.target.value,agruparGrupos:!e.target.value})}>
          <option value='1'>Individualmente</option>
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
