import loaderImg from '../images/loader.gif';
function Loader(props){
  const loaderClassName = (`loader ${!props.isOpen ? 'loader_hidden' : ''}`); 
  return (
    <div className={loaderClassName}>
      <img className="loader__image" src={loaderImg} alt="this page is loading"/>
      <h1>{props.errMsg}</h1>
    </div>
  )
}
export default Loader;