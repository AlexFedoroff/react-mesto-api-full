import {apiSettings} from './data.js';

class Auth {
  constructor({ address }) {
    this._address = address;      
  }
    
  _checkRes(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
    
  signUp(data) {    
    return fetch(`${this._address}/signup`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",            
        },
        body: JSON.stringify({ password:data.password, email:data.email }),
      })
        .then((res) => {
          return this._checkRes(res);
        });
    }

  signIn(data) {    
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",            
      },
      body: JSON.stringify({ password:data.password, email:data.email }),
      })
      .then((res) => {
          return this._checkRes(res);
      });
    }

  getUserInfo(token) {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      })
      .then((res) => {
        return this._checkRes(res);
      });
  } 
}

const auth = new Auth({
  address: apiSettings.authAddress
});

export default auth;