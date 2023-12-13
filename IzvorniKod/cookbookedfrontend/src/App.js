import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Registracija from "./komponente/Registracija";
import Home from "./komponente/Home";
import Login from "./komponente/Login"
import NoPage from "./komponente/NoPage";
import Atributions from "./komponente/Atributions";
import SideBar from "./komponente/SideBar";
import Profile from "./komponente/Profile";
import RecipeForm from "./komponente/RecipeForm";


function App() {

  return (
      <div className="App">
          <div className="Header">
              <div className="MenuIkona">
                  <button></button>
              </div>
              <div className="Ikona">
                  <h4 className = "ContainsIkona">CookBooked</h4>
              </div>
              <a className = "Header-button" href = "/">
                  <button>Home</button>
              </a>
              <a className = "Header-button" href = "/Login" >
                  <button>Prijava</button>
              </a>
              <a className = "Header-button" href = "/Registracija">
                  <button>Registracija</button>
              </a>
              <a className = "Header-button" href = "/Profile">
                    <button>Profil</button>
               </a>
              <a className = "Header-button" href = "/AddRecipe">
                                   <button>Dodaj recept</button>
                              </a>
              <a className = "Header-button" href = "/Atributions">
                  <button>Atributions</button>
              </a>



          </div>
            <div className="Tijelo">

              <BrowserRouter>
                  <Switch>
                      <Route path="/" exact>{<Home/>}</Route>
                      <Route path="/Registracija" exact component={Registracija} />
                      <Route path="/Login" exact component={Login} />
                      <Route path="/Profile" exact component={Profile} />
                        <Route path="/AddRecipe" exact component={RecipeForm} />
                      <Route path="/Atributions" exact component={Atributions} />

                      <Route path="/*" exact component={NoPage} />
                  </Switch>
              </BrowserRouter>

                <SideBar/>
            </div>
      </div>
  );
}

export default App;
