import Logo from '../images/logo.svg';
import React from "react";
import { Route, NavLink, Switch } from 'react-router-dom';

function Header({email,...props}) { 
  function handleLogout() {
    props.onLogout();
  }
  
  return (
    <header className="header">        
      <img src={Logo} className="header__logo" alt="Логотип"/>
      <p className="header__email">{email}</p>
      <Switch>
        <Route path="/sign-in" >
          <NavLink to="sign-up" className="header__loginout-lnk">Регистрация</NavLink>
        </Route>
        <Route path="/sign-up">
          <NavLink to="sign-in" className="header__loginout-lnk">Войти</NavLink>
        </Route>
        
        <Route exact path="/">
          <p 
            className="header__loginout-lnk"
            onClick={handleLogout}>
            Выйти
          </p>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;