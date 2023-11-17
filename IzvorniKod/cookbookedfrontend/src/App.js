import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Registracija from "./komponente/Registracija";
import Home from "./komponente/Home";
import Layout from "./komponente/Layout";
import Login from "./komponente/Login"
import NoPage from "./komponente/NoPage";

function App() {

  return (
      <div className="App">
          <div className="Header">
              <button className = "Header-button" href = "/">Home</button>
              <button className = "Header-button" href = "/Login" >Prijava</button>
              <button className = "Header-button" href = "/Registracija">Registracija</button>
          </div>

          <BrowserRouter>
              <Switch>
                  <Route path='/' exact ><Home/></Route>
                  <Route path='/Login' exact ><Login/></Route>
                  <Route path='/Registration' exact ><Registracija/></Route>
                  <Route path='*' exact ><NoPage/></Route>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
