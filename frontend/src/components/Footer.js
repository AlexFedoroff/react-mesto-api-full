function Footer(props) {
  if (!props.isLoggedIn) {
    return '';
  }
  return (
    <footer className="footer">
    <p className="footer__logo">© 2022 Mesto Russia</p>
    </footer>
  )
}

export default Footer;