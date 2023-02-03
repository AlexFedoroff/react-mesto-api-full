import { useState } from "react";
import AuthPage from "./AuthPage.js";

export default function Login(props) {
  const [values, setValues] = useState({ email: "", password: "" });

  function handleChange(evt) {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  }

  function handleLogin(evt) {
    evt.preventDefault();
    props.onLogin(values);
  }
  return (
    <AuthPage
      name="login"
      title="Вход"
      btnText="Войти"
      onSubmit={handleLogin}
      loadingText="Сохранение..."
    >
      <input
        type="email"
        className="popup__field popup__field_auth"
        id="email-input"        
        value={values.email}
        name="email"
        placeholder="email"
        minLength="5"
        maxLength="64"
        onChange={handleChange}
        required
      />      
      <input
        type="password"
        className="popup__field popup__field_auth"
        id="password-input"
        placeholder="Пароль"
        minLength="8"
        maxLength="32"
        value={values.password}
        name="password"
        onChange={handleChange}
        required
      />      
    </AuthPage>
  );
}