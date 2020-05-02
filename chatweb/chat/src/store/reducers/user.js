const CLEAN_STATE = {
  login:false,
  consultor:false,      
  userID:'',
  userName:'',
  password:'',
  error:'',
}

const INITIAL_STATE = iniciaState();

export default function user(state = INITIAL_STATE, action){
  switch(action.type){
    case 'LOGIN':{
        saveLocalStore(state,action)
        return{...state,userID:action.userID, login:action.login};
      } 

    case 'SET_CONSULTOR':
      return {...state,consultor:action.consultor};

    case 'SET_LOGIN':
      return {...state,userName:action.userName};

    case 'SET_USERID':
      return {...state,userID:action.userID};

    case 'SET_PASSWORD':
      return {...state,password:action.password};

    case 'LOGOUT':{
        localStorage.removeItem('user');
        return {...state,...CLEAN_STATE};
      }

    case 'ALERT':
      return {...state,error:action.error};
      
    default:
      return state;
  }

}

function saveLocalStore(state,action){
  const {consultor,userName} = state;
  const {userID} = action;
  localStorage.setItem('user',JSON.stringify({
    login:true,
    consultor, 
    userName,
    userID,
  }));
  
}

function iniciaState(){
  const localStore = JSON.parse(localStorage.getItem('user'));
  if (localStore){
    return {...localStore,password:'',error:''};
  }
  else{
    return CLEAN_STATE;
  };

}