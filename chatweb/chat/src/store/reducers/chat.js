/*case 'CHAT_VIEW':
  return {...state,chat:action.chat};*/
//como state inicializa vazio precisamos setar um valor inicial
const INITIAL_STATE = {
  qtyMsg:0,
  newMsg:'',
  msgs:[],
}; 



//função que armazena state e pode manipula-lo 
//(para alterar é necessario as actions. Que sao funçoes feitas num arquivo separado
//ou diretamente no componente que precisa fazera alteração)

export default function chat(state =  INITIAL_STATE,action){

  switch(action.type){
    case 'LOAD_CHAT':
      return {
        ...state,
      msgs:action.msgs,
    };
    case 'SET_NEWMSG':
      return {
        ...state,
      newMsg:action.newMsg,
    };
    case 'ADD_NEWMSG':
      return {
        ...state,      
      msgs:[...state.msgs,action.newMsg],
      newMsg:'',
    };
    case 'SET_QTYMSG':
      return {
        ...state,
      qtyMsg:action.qtyMsg,
    };
    case 'DEL_MSG':
      return {
        ...state,
        msgs:action.msgs
    };
    default:
      return state;
  }
}