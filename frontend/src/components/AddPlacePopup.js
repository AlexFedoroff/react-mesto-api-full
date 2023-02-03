import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const nameRef = useRef(null);
  const linkRef = useRef(null);

  function handleSubmit(e){
    e.preventDefault();
    props.onAddPlace({ name: nameRef.current.value, link: linkRef.current.value })    
    linkRef.current.value='';
    nameRef.current.value='';
  }
      
  return (
    <PopupWithForm 
      name="add" 
      title="Новое место" 
      isOpen={props.isOpen}
      onClose={props.onClose} 
      onSubmit={handleSubmit}
      saveBtnText="Создать"
      isDataRetrieving={props.isDataRetrieving}
      >
      <input 
        className="popup__field popup__field_title" 
        ref={nameRef}
        type="text" 
        name="name"
        placeholder="Название" 
        id="input-title" 
        minLength="2" 
        maxLength="30"
        required
        />
      <span className="popup__error popup__error_input-title" id="input-title-error"></span>
      <input         
        type="url"
        className="popup__field popup__field_link"
        ref={linkRef}
        name="link"
        id="input-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_input-link" id="input-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;