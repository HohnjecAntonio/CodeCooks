import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Registracija from "./komponente/Registracija";
import Home from "./komponente/Home";
import Login from "./komponente/Login"
import NoPage from "./komponente/NoPage";

function App() {

  return (
      <div className="App">
          <div className="Header">
              <a className = "Header-button" href = "/">Home</a>
              <a className = "Header-button" href = "/Login" >Prijava</a>
              <a className = "Header-button" href = "/Registracija">Registracija</a>
          </div>

          <BrowserRouter>
              <Switch>
                  <Route path="/" exact>{<Home/>}</Route>
                  <Route path="/Registracija" exact component={Registracija} />
                  <Route path="/Login" exact component={Login} />
                  <Route path="/*" exact component={NoPage} />
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
