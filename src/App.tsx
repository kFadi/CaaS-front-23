import './App.css';
import Footer from './Components/Layout/Footer/Footer';
import HeaderCenter from './Components/Layout/HeaderCenter/HeaderCenter';
import HeaderRight from './Components/Layout/HeaderRight/HeaderRight';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import MenuRight from './Components/Layout/MenuRight/MenuRight';

function App() {
  return (
    <div className="App">
      <div className="header-left"/>
      <HeaderCenter/>
      <HeaderRight/>
      <div className="menu-left"/>
      <Menu/>
      <MenuRight/>
      <Main/>
      <Footer/>
      
    </div>
  );
}

export default App;
