import { Link } from "react-router-dom";

function authPage(props) {    
  
  let redirectClassName = "popup__auth-redirect";

  if (props.name === "register") {    
    redirectClassName = redirectClassName + " popup__auth-redirect_visible"
  }   

  return (
    <div className="popup popup_auth popup_opened">
      <div className="popup__container popup__container_auth">
        <h2 className="popup__title popup__title_auth">{props.title}</h2>
        <form className="popup__form popup__form_auth" name={`${props.name}-form`} onSubmit={props.onSubmit}>
          {props.children}
          <button
            className="popup__save-btn popup__save-btn_auth"
            type="submit"
          >
            {props.btnText}
          </button>
          <p className={redirectClassName}>
          Уже зарегистрированы?
          <Link to="/sign-in" className="popup__auth-redirect-lnk">
            Войти
          </Link>
        </p>
        </form>        
      </div>
    </div>
  );
}

export default authPage;