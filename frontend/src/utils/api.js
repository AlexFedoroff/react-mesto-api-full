import { apiSettings } from './data';

class Api {
  constructor({ address, headers }) {
    this.address = address;
    this.headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  checkRes(res) {
    if (!res.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // Информация о пользователе
  getUserInfo() {
    return fetch(`${this.address}/users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => this.checkRes(res));
  }

  // Список фото с ресурса
  getCards() {
    return fetch(`${this.address}/cards`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => this.checkRes(res));
  }

  // Изменение информации о пользователей
  editUserInfo(data) {
    return fetch(`${this.address}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => this.checkRes(res));
  }

  // Добавление фото
  addCard(cardInfo) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link,
      }),
    })
      .then((res) => this.checkRes(res));
  }

  // Удаление фото
  deleteCard(cardId) {
    return fetch(`${this.address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => this.checkRes(res));
  }

  toggleLike(cardId, isLiked) {
    const methodName = (isLiked ? 'DELETE' : 'PUT');
    return fetch(`${this.address}/cards/${cardId}/likes`, {
      method: methodName,
      headers: this.headers,
    })
      .then((res) => this.checkRes(res));
  }

  editAvatar(data) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => this.checkRes(res));
  }
}

const api = new Api({
  address: apiSettings.address,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default api;
