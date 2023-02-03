import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarInputLinkRef = useRef(null);
  
  useEffect(() => {
    avatarInputLinkRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
      
    props.onUpdateAvatar({
      avatar:  avatarInputLinkRef.current.value
    });
  } 

  return (
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар" 
      isOpen={props.isOpen}
      onClose={props.onClose} 
      onSubmit={handleSubmit}
      saveBtnText="Сохранить"
      isDataRetrieving={props.isDataRetrieving}>
      <input 
        type="url"
        ref={avatarInputLinkRef}
        name="avatarLink"
        defaultValue="" 
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_avatar-url"
        id="avatar-field"
        required/>
      <span className="popup__error popup__error_avatar-field"></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;