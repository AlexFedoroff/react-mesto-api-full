function ConfirmPopup(props){
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.card);
  }

  return (    
    <div className={`popup popup_delete-card${props.isOpen && " popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close-icon popup__close-icon_confirm-delete" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title popup__title_confirm-delete">Вы уверены?</h2>
        <form 
          className="popup__form popup__form_confirm-delete" 
          name="confirm-delete" 
          onSubmit={handleSubmit}
          noValidate> 
        <button type="submit" className="popup__save-btn popup__save-btn_confirm-delete">Да</button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmPopup;