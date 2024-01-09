import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';
import Registracija from "./komponente/Registracija";
import Home from "./komponente/Home";
import Login from "./komponente/Login"
import NoPage from "./komponente/NoPage";
import Atributions from "./komponente/Atributions";
import SideBar from "./komponente/SideBar";
import Profile from "./komponente/Profile";
import RecipeForm from "./komponente/RecipeForm";
import PrivateProfile from "./komponente/PrivateProfile";
import CategoryButtons from './komponente/CategoryButtons';
import Chat from './messenger/Chat'

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    return (
      <div className="App">
          <div className="Header">
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
              <a className = "Header-button" href = "/Chat">
                  <button>Chat</button>
              </a>


          </div>
            <div className="Tijelo">
                <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle login</button>
                {/*isToggled && <Test />*/}
                {/*isToggled ? <Test /> : "The value is false"*/}
              <BrowserRouter>
                  <Switch>
                        <Route path="/" exact>{<Home/>}</Route>
                        <Route path="/Registracija" exact component={Registracija} />
                        <Route path="/Login" exact component={Login} />
                        <Route path="/Profile" exact component={Profile} />
                        <Route path="/PrivateProfile" exact component={PrivateProfile} />
                        <Route path="/AddRecipe" exact component={RecipeForm} />
                        <Route path="/Atributions" exact component={Atributions} />
                        <Route path="/Categories" exact component={CategoryButtons} />
                        <Route path="/Chat" exact component={Chat} />
                        <Route path="/*" exact component={NoPage} />
                  </Switch>
              </BrowserRouter>

                
            </div>
            <SideBar isLoggedIn={isLoggedIn} changeLoginState = {isLoggedIn => setIsLoggedIn(isLoggedIn)} />
      </div>
  );
}

export default App;
