export function setLoginUser(userName){ 
  return {
    type:'SET_LOGIN',
    userName,
  };
}

export function setConsultor(consultor){ 
  return {
    type:'SET_CONSULTOR',
    consultor,
  };
}

export function setPassword(password){ 
  return {
    type:'SET_PASSWORD',
    password,
  };
}

export function setUserId(userId){ 
  return {
    type:'SET_USERID',
    userId,
  };
}

export function login(user,id){
  console.log('id dentro de login ',id)
  if (user.userName){
    if (user.userName.length>2){
      if (user.consultor){
        if (user.userName==='Consultor'&&user.password==='1234'){
          //entrar como consultor de uma maneira facil e pouco segura
          return{
            type:'LOGIN',
            userID:id,
            login:true,
          };
          
        }
        else{
          return{
            type:'ALERT',
            error:'Login ou senha do Consultor Incorretos!',
          };
        }
      }
      else{
        if (user.userName==='Consultor') return {
          type:'ALERT',
          error:'Selecione entrar como Consultor',
        };
        //logar como usuário normal
        //fazer consulta via api para saber se nome ja exite se sim retornar
        //os dados da ID
        return{
          type:'LOGIN',
          userID:id,
          login:true,
        };
                 
      }
    }
    else{
      return{
        type:'ALERT',
        error:'Nome de usuário muito curto!',
      };
    }
  }
  else{
    return{
      type:'ALERT',
      error:'Digite o nome do usuário!',
    };
  }
}

