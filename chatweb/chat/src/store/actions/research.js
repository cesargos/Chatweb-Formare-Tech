
export function setOrder(order){ 
  return {
    type:'SET_ORDER',
    order,
  };
}

export function setUserName(userName){ 
  return {
    type:'SET_SEARCHUSERNAME',
    userName,
  };
}

export function setInitialDate(initialDate){ 
  return {
    type:'SET_INITIALDATE',
    initialDate,
  };
}
export function setEndDate(endDate){ 
  return {
    type:'SET_ENDDATE',
    endDate,
  };
}
export function setByUserName(byUserName){ 
  return {
    type:'SET_BYUSERNAME',
    byUserName,
  };
}

export function setByInitialDate(byInitialDate){ 
  return {
    type:'SET_BYINITIALDATE',
    byInitialDate,
  };
}
export function setByEndDate(byEndDate){ 
  return {
    type:'SET_BYENDDATE',
    byEndDate,
  };
}
export function clearSearch(){ 
  return {
    type:'CLEAR_SEARCH',
  };
}
export function loadChat(msgs){ 
  return {
    type:'LOAD_CHAT',
    msgs,
  };
}
