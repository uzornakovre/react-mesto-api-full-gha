class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    }).then(this._checkStatus)
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    }).then(this._checkStatus)
  }

  changeUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name:  userData.name,
        about: userData.about
      })
    }).then(this._checkStatus);
  }

  changeUserAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    }).then(this._checkStatus);
  }

  createCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.placeName,
        link: cardData.placeLink
      })
    }).then(this._checkStatus)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkStatus)
  }

  likeCard(id, owner) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        likes: [owner]
      })
    }).then(this._checkStatus)
  }

  dislikeCard(id, owner) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        likes: [owner]
      })
    }).then(this._checkStatus)
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    // authorization: 'a67dcede-ed6f-4bc9-92bc-dd4c6eb33b08',
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:3001'
  }
});