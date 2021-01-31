import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/NavBar/Navbar"
import "./Components/styles/universal-styles.css"
import Images from "./Components/UploadImage.jsx"
import ShowCase from "./Components/ShowCase/ShowCase"
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ProductsList from "./Components/ProductsList/ProductList"
import ProductView from './Components/singleViewProduct/ProductSingleView'
import Cart from './Components/Cart/Cart'

function App() {
  return (
    <div className="App">
     
     <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/' component={ShowCase}></Route>
        <Route exact path='/product/' component={ProductsList}></Route>
        
        <Route exact path='/singleProduct' component={ProductView}></Route>
        <Route exact path='/Cart' component={Cart}></Route>


      </Switch>

     </Router>
     
     
    </div>
  );
}

export default App;
