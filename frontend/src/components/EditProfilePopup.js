import PopupWithForm from './PopupWithForm';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import {useState, useContext, useEffect } from 'react';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name);
    }
    if (currentUser.about){
      setDescription(currentUser.about);  
    }
  }, [currentUser,props.isOpen]);

  function handleChange(e) {    
    e.target.name === 'name' ? setName(e.target.value) : setDescription(e.target.value);
  }
  
  function handleSubmit(e) {    
    e.preventDefault();
    props.onUpdateUser({name, about:description});
  } 
  
  return (
    <PopupWithForm 
      name="edit" 
      title="Редактировать профиль" 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveBtnText="Сохранить"
      isDataRetrieving={props.isDataRetrieving}
    >      
      <input 
        className="popup__field popup__field_name" 
        type="text"
        name="name"
        placeholder="Имя"
        id="input-name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChange}
        required
      />
      <span className="popup__error popup__error_input-name" id="input-name-error"></span>
      <input 
        className="popup__field popup__field_description" 
        type="text" 
        name="about"
        id="input-description"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChange}
        required
      />
      <span className="popup__error popup__error_input-description" id="input-description-error"></span>
  </PopupWithForm>
  )
}
export default EditProfilePopup;