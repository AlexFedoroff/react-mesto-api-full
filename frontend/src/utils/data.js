import infoImgFailure from '../images/AuthImgFailure.png';
import infoImgSuccess from '../images/AuthImgSuccess.png';

export const apiSettings = { address: `${window.location.protocol}${process.env.REACT_APP_API_URL}` };
// export const apiSettings = { address: 'http://localhost:2800' };

export const infoTooltipSettings = {
  regFailureImg: infoImgFailure,
  regSuccessImg: infoImgSuccess,
  regSuccessMsg: 'Вы успешно зарегистрировались!',
  regFailureMsg: 'Что-то пошло не так! Попробуйте еще раз.',
};
