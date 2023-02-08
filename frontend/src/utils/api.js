import { apiSettings } from './data';

class Api {
  constructor({ address, headers }) {
    this.address = address;
    this.headers = headers;
  }

  doFetch(path, methodParam, bodyObj) {
    return fetch(`${this.address}${path}`, {
      method: methodParam,
      headers: this.headers,
      withCredentials: true,
      credentials: 'include',
      body: bodyObj ? JSON.stringify(bodyObj) : undefined,
    })
      .then(this.checkRes);
  }

  // eslint-disable-next-line class-methods-use-this
  checkRes(res) {
    if (!res.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(res);
    }
    return res.json();
  }

  // Информация о пользователе
  getUserInfo() {
    return this.doFetch('/users/me', 'GET');
  }

  // Список фото с ресурса
  getCards() {
    return this.doFetch('/cards', 'GET');
  }

  // Изменение информации о пользователей
  editUserInfo(data) {
    return this.doFetch('/users/me', 'PATCH', { name: data.name, about: data.about });
  }

  // Добавление фото
  addCard(cardInfo) {
    return this.doFetch('/cards', 'POST', { name: cardInfo.name, link: cardInfo.link });
  }

  // Удаление фото
  deleteCard(cardId) {
    return this.doFetch(`/cards/${cardId}`, 'DELETE');
  }

  // like/dislike
  toggleLike(cardId, isLiked) {
    const methodName = (isLiked ? 'DELETE' : 'PUT');
    return this.doFetch(`/cards/${cardId}/likes`, methodName);
  }

  // Изменение аватара
  editAvatar(data) {
    return this.doFetch('/users/me/avatar', 'PATCH', { avatar: data.avatar });
  }
}

const api = new Api({
  address: apiSettings.address,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
