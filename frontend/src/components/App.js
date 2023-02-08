import { React, useState, useEffect } from 'react';
import '../index.css';
import {
  Route, useHistory, Switch,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Loader from './Loader';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import Api from '../utils/api';
import Auth from '../utils/Auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { infoTooltipSettings } from '../utils/data';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [loaderState, setLoader] = useState({ isOpen: false });
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardForDelete, setSelectedCardForDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isDataRetrieving, setIsDataRetrieving] = useState(false);
  const history = useHistory();
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [isInfotooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [respMessage, setRespMessage] = useState(null);

  // Открытие попапа редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  // Открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  // Открытие попапа редактирования аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  // Открытие карточки
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }
  // Закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
  }
  // Обновление аватара
  function handleUpdateAvatar(data) {
    setIsDataRetrieving(true);
    Api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setLoader({ isOpen: true, errMsg: err });
      })
      .finally(() => {
        setIsDataRetrieving(false);
      });
  }
  // Обновление данных пользователя
  function handleUpdateUser(data) {
    setIsDataRetrieving(true);
    Api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setLoader({ isOpen: true, errMsg: err });
      })
      .finally(() => {
        setIsDataRetrieving(false);
      });
  }
  /* eslint no-underscore-dangle: 0 */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    Api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Удаление карточки
  function handleCardDelete(card) {
    Api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }
  // Добавление карточки
  function handleAddPlace(data) {
    setIsDataRetrieving(true);
    Api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        setLoader({ isOpen: true, errMsg: err });
      })
      .finally(() => {
        setIsDataRetrieving(false);
      });
  }
  // Открытие окна подтверждения
  function handleConfirmOpen(card) {
    setConfirmPopupOpen(true);
    setSelectedCardForDelete(card);
  }

  const checkAuth = () => {
    Auth
      .getUserInfo()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          history.push('/');
        } else {
          setLoggedIn(false);
          setEmail('');
        }
      })
      .catch(() => {
        setLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Рендеринг при аутентификации
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        Api.getUserInfo(),
        Api.getCards(),
      ])
        .then((data) => {
          const [userData, cardsLst] = data;
          setCurrentUser(userData);
          setCards(cardsLst);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader({ isOpen: false, errMsg: '' });
        });
    } else {
      setCurrentUser({});
      setEmail('');
    }
  }, [isLoggedIn]);

  // Регистрация
  function handleRegistration(data) {
    Auth
      .signUp(data)
      .then(() => {
        setRegSuccess(true);
        setInfoTooltipOpen(true);
        setRespMessage(infoTooltipSettings.regSuccessMsg);
        history.push('/sign-in');
      })
      .catch((err) => {
        setRespMessage(err.message);
        setRegSuccess(false);
        setInfoTooltipOpen(true);
      });
  }

  // Вход в приложение
  function handleLogin(data) {
    Auth
      .signIn(data)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.email);
        history.push('/');
        setRegSuccess(true);
      })
      .catch((err) => {
        setRespMessage(err.message);
        setRegSuccess(false);
        setInfoTooltipOpen(true);
      })
      .finally(() => setLoader({ isOpen: false, errMsg: '' }));
  }
  // Выход из приложения
  function handleLogout() {
    setLoggedIn(false);
    setEmail('');
    Auth
      .signOut()
      .catch((err) => console.log(err.message));
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header email={email} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Switch>
          {currentUser._id && (
            <ProtectedRoute
              exact
              path="/"
              loggedIn={isLoggedIn}
              component={Main}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmOpen}
              cards={cards}
              isLoggedIn={isLoggedIn}
            />
          )}
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>
        </Switch>
        <Footer isLoggedIn={isLoggedIn} />
        <Loader isOpen={loaderState.isOpen} errMsg={loaderState.errMsg} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDataRetrieving={isDataRetrieving}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isDataRetrieving={isDataRetrieving}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDataRetrieving={isDataRetrieving}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          card={selectedCardForDelete}
          onSubmit={handleCardDelete}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfotooltipOpen}
          // eslint-disable-next-line max-len
          infoImg={isRegSuccess ? infoTooltipSettings.regSuccessImg : infoTooltipSettings.regFailureImg}
          // eslint-disable-next-line max-len
          infoMsg={respMessage}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>

  );
}
export default App;
