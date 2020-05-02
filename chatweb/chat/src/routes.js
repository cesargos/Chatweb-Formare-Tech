import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';


import Main from './pages/main';
import Login from './pages/login';
import Users from './pages/users';



export default function Routes(){
  const user = useSelector(state => state.user);
  return (   
      <BrowserRouter>                
          {!user.login?
            <Route path="/" component ={Login} />:
            <Switch>
              {user.consultor?<Route path="/users" component={Users} />:''}
              <Route path="/" component={Main}/>
            </Switch>
          }        
      </BrowserRouter>
  )
};




/*
controlando autenticação em rotas jo ReactJs
1- instale o react-router-dom na sua aplicação. No prompt dentro da pasta do seu app fazer
  yarn add react-router-dom 

2 - No arquivo routes.js 
    import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
      BrowserRouter:versão do router pra browser para conseguir trabalhar com history do navegador
      Route: Serve para definir uma rota
      Switch: Nao deixa mais de uma rota ser chamada ao mesmo tempo. se so tiver 
              dentro do browserRouter ele pode abrir os dois componentes
      Redirect: usado para direcionar a rota no navegador do usuario
        const PrivateRoute = ({component:component,...rest}) =>(
          <Router {..rest} render={props => (
            isAuthenticated()?(
              <Component {...props} />
            ):(
              //exemplo para a raiz
              <Redirect to={{pathname:'/',state:{from: props.location}}} />
              //pode usar esse state dentro de outra rota para ele nao perder o historico de navegação
            )
          )} />
        );


        em <Switch> do route.js pode fazer
        <Switch>
          <Route exact path="/" component={()=><h1>Hellw World</h1>} />
          <PrivateRoute path="/app" component={()=> <h1> Vc esta logado</h1>} />
        </Switch>
        

*/
