import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import api from '../../services/api';
import "./styles.css";
import * as setSearch from '../../store/actions/research';


function configData(data,dd=0){
  data = new Date(data);
  data.setUTCDate(data.getUTCDate()+dd)
  return data.toISOString().slice(0,10);
}


const loadDB = async (loadChat,research) =>{
  const userName = research.byUserName?research.userName:'';
  const initialDate = research.byInitialDate?configData(research.initialDate,-1):'';
  const endDate = research.byEndDate?configData(research.endDate,1):'';
  const order =  research.order?'1':'-1';
  const url = `/chat?userName=${userName}&initialDate=${initialDate}&endDate=${endDate}&order=${order}`;
  const chatResponse = await api.get(url);
  if (chatResponse.statusText==='OK'){
    loadChat(chatResponse.data);
  }
  else{
    alert("Erro ao carregar as mensagens do chat!");
    console.log(chatResponse);
  }
  return true;
};








const Research = ({research,setOrder,setUserName, setInitialDate, setEndDate,setByUserName, setByInitialDate, setByEndDate,loadChat,clearSearch})=>{
  
  
  
  
  const filterUsers = ()=>{
    if (research.initialDate>research.endDate) return alert('Data inicial não pode ser maior que a data final!');
    loadDB(loadChat,research);
  }

  function clear(){
    const cleanFilter = {userName:'',initialDate:'',endDate:'',order:true};
    clearSearch();
    loadDB(loadChat,cleanFilter)
  }




  return (   
    <aside className="main-aside">      
      <div className='research'>
        <div>
          <p>Pesquisar por:</p>
        </div>
        <div className='search'>
          <p>
            <input className='checkbox' type="checkbox" checked={research.byUserName} 
              onChange={(e)=>setByUserName(e.target.checked)}/>
            Nome de usuário:
          </p>
          <input className='findUser' placeholder="Digite o nome do usuário." 
            type={research.byUserName?'text':'hidden'} value={research.userName} 
            onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='search'>
          <p>
          <input className='checkbox' type="checkbox" checked={research.byInitialDate} 
             onChange={(e)=>setByInitialDate(e.target.checked)}/>
            Data inicial:
          </p>
          <input className='date' type={research.byInitialDate?'date':'hidden'}
           value={research.initialDate} onChange={(e)=>setInitialDate(e.target.value)}/>
        </div>
        <div className='search'>
          <p>
          <input className='checkbox' type="checkbox" checked={research.byEndDate} 
              onChange={(e)=>setByEndDate(e.target.checked)}/>
            Data final:
          </p>
          <input className='date' type={research.byEndDate?'date':'hidden'} value={research.endDate}
          onChange={(e)=>setEndDate(e.target.value)}/>
        </div>
        <p>
          <input className='checkbox' type="checkbox" checked={research.order} 
              onChange={(e)=>setOrder(e.target.checked)}/>
             - Ordenar por Data
          </p>
        <div>
          <button className='btn-search' onClick={filterUsers}>Pesquisar</button>
          <button className='btn-search' onClick={clear}>Limpar Pesquisa</button>
        </div>
      </div>
    </aside>
  ); 
}

const mapStateToProps = state => ({
  research:state.research
});


const mapDispatchToProps = dispatch =>
   bindActionCreators(setSearch,dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Research);