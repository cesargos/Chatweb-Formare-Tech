const today = strDateToday();

const INITIAL_STATE = {
  userName:'',
  initialDate:today,      
  endDate:today,
  byUserName:false,
  byInitialDate:false,
  byEndDate:false,
  order:true
}

export default function research(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SET_SEARCHUSERNAME':
      return {...state,userName:action.userName};
    case 'SET_INITIALDATE':
      return {...state,initialDate:action.initialDate};
    case 'SET_ENDDATE':
      return {...state,endDate:action.endDate};
    case 'SET_ORDER':
      return {...state,order:action.order};
    case 'SET_BYUSERNAME':
      return {...state,byUserName:action.byUserName};
    case 'SET_BYINITIALDATE':
      return {...state,byInitialDate:action.byInitialDate};
    case 'SET_BYENDDATE':
      return {...state,byEndDate:action.byEndDate};
    case 'CLEAR_SEARCH':
      return {...state,...INITIAL_STATE};
    default:
      return state;
  }

}

function strDateToday(){
  const date = new Date();
  return date.toISOString().slice(0,10);
}
