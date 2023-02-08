import infoImgFailure from '../images/AuthImgFailure.png';
import infoImgSuccess from '../images/AuthImgSuccess.png';

export const apiSettings = {
  // address: 'https://api.alexfedoroff.nomoredomainsclub.ru',
  address: `${window.location.protocol}${'//localhost:2800'}`,
  // address: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:2800'}`,
};

export const infoTooltipSettings = {
  regFailureImg: infoImgFailure,
  regSuccessImg: infoImgSuccess,
  regSuccessMsg: 'Вы успешно зарегистрировались!',
  regFailureMsg: 'Что-то пошло не так! Попробуйте еще раз.',
};
