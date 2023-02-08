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

  doFetch(path, methodParam, bodyObj) {
    return fetch(`${this.backendAddress}${path}`, {
      method: methodParam,
      headers: this.headers,
      withCredentials: true,
      credentials: 'include',
      body: bodyObj ? JSON.stringify(bodyObj) : undefined,
    })
      .then(this.checkRes);
  }

  signUp(data) {
    return this.doFetch('/signup', 'POST', { password: data.password, email: data.email });
  }

  signIn(data) {
    return this.doFetch('/signup', 'POST', { password: data.password, email: data.email });
  }

  signOut() {
    return this.doFetch('/signout', 'POST');
  }

  getUserInfo() {
    return this.doFetch('/users/me', 'GET');
  }
}

const auth = new Auth({
  address: apiSettings.address,
});

export default auth;
