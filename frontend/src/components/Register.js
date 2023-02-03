import AuthPage from "./AuthPage.js";
import { useState } from "react";
//import { Link } from "react-router-dom";

export default function Register(props) {
  const [values, setValues] = useState({ email: "", password: "" });

  function handleChange(evt) {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  }

  function handleRegistration(evt) {
    evt.preventDefault();
    props.onRegister(values);
  }

  return (
    <>
      <AuthPage
        name="register"
        title="Регистрация"
        btnText="Зарегистрироваться"
        onSubmit={handleRegistration}
        loadingText="Сохранение..."
      >
        <input
          type="email"
          className="popup__field popup__field_auth"
          id="email-input"
          placeholder="Email"
          minLength="5"
          maxLength="64"
          value={values.email}
          name="email"
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
    </>
  )
};