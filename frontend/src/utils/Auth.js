import { apiSettings } from './data';

class Auth {
  constructor({ address }) {
    this.backendAddress = address;
  }

  // eslint-disable-next-line class-methods-use-this
  checkRes(res) {
    if (res.ok) return res.json();
    const { status } = res;
    return res.json().then((data) => {
      const error = new Error(Object.values(data));
      error.code = status;
      throw error;
    });
  }

  signUp(data) {
    return fetch(`${this.backendAddress}/signup`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: data.password, email: data.email }),
    })
      .then((res) => this.checkRes(res));
  }

  signIn(data) {
    return fetch(`${this.backendAddress}/signin`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: data.password, email: data.email }),
    })
      .then((res) => this.checkRes(res));
  }

  signOut() {
    return fetch(`${this.backendAddress}/signout`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => this.checkRes(res));
  }

  getUserInfo() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this.backendAddress}/users/me`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => this.checkRes(res));
  }
}

const auth = new Auth({
  address: apiSettings.address,
});

export default auth;
