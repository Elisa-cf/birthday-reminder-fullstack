import Button from './Button';

const Header = ({showAdd, onAdd}) => {
  return (<header>
   <h2>Birthday reminder</h2>
    <Button color={showAdd ? "#ff4154" : "#ff4154"} text={showAdd ? "Hide form" : "Show form"} 
   onClick={onAdd}/>
  </header>)
};

export default Header;
