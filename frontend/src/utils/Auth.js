import { apiSettings } from './data';

class Auth {
  constructor({ address }) {
    this.backendAddress = address;
  }

  // eslint-disable-next-line class-methods-use-this
  checkRes(res) {
    // console.log(`${this.backendAddress}/users/me`);
    // console.log(res);
    // console.log(res.status);
    if (!res.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  signUp(data) {
    return fetch(`${this.backendAddress}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: data.password, email: data.email }),
    })
      .then((res) => this.checkRes(res));
  }

  signIn(data) {
    return fetch(`${this.backendAddress}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: data.password, email: data.email }),
    })
      .then((res) => this.checkRes(res));
  }

  getUserInfo(token) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this.backendAddress}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this.checkRes(res));
  }
}

const auth = new Auth({
  address: apiSettings.address,
});

export default auth;
