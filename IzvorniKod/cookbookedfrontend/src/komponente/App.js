
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Registracija from "./komponente/Registracija";
import Home from "./komponente/Home";
import Login from "./komponente/Login"
import NoPage from "./komponente/NoPage";
import Atributions from "./komponente/Atributions";
import SideBar from "./komponente/SideBar";
import Profile from "./komponente/Profile";
import RecipeForm from "./komponente/RecipeForm";
import PrivateProfile from "./komponente/PrivateProfile";
import RecipePage from "./komponente/RecipePage";
import CategoryButtons from './komponente/CategoryButtons';
import Chat from './messenger/Chat'

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(1);
    const [profileID, setProfileID] = useState(1);

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
               <a className = "Header-button" href = "/PrivateProfile">
                    <button>Privatni profil</button>
               </a>
              <a className = "Header-button" href = "/AddRecipe">
                                   <button>Dodaj recept</button>
                              </a>
              <a className = "Header-button" href = "/Atributions">
                  <button>Atributions</button>
              </a>
              <a className = "Header-button" href = "/Categories">
                  <button>Categories</button>
              </a>
              <a className = "Header-button" href = "/Chat">
                  <button>Chat</button>
              </a>
              <a className = "Header-button" href = "/RecipePage">
                  <button>Recept</button>
              </a>


          </div>
            <div className="Tijelo">
                <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle login</button>
              <BrowserRouter>
                  <Switch>
                        <Route path="/" exact>
                            {<Home profileID={profileID} 
                                changeProfileID = {newProfileID => 
                                {
                                    setProfileID(newProfileID);
                                    console.log(newProfileID);
                                    localStorage.setItem('profileToLoad', JSON.stringify(newProfileID));
                                    console.log("Added to storage:" + localStorage.getItem('profileToLoad'));
                                }}/>}

                        </Route>
                        <Route path="/Registracija">
                            <Registracija/>
                        </Route>

                        <Route path="/Login" exact>
                            {<Login isLoggedIn={isLoggedIn} changeLoginState = {isLoggedIn => setIsLoggedIn(isLoggedIn)} 
                            currentUserID={currentUserID} changeCurrentUserID = {currentUserID => 
                            {
                                setCurrentUserID(currentUserID);
                                console.log(currentUserID);
                            }}
                            
                            
                            />}
                        </Route>
                        <Route path="/Profile" exact>
                            {<Profile currentUserID={currentUserID} profileID={JSON.parse(localStorage.getItem('profileToLoad'))}
                                />}
                        </Route>
                        
                        
                        <Route path="/PrivateProfile" exact component={PrivateProfile} />
                        <Route path="/AddRecipe" exact component={RecipeForm} />
                        <Route path="/Atributions" exact component={Atributions} />
                        <Route path="/Categories" exact component={CategoryButtons} />
                        <Route path="/Chat" exact component={Chat} />
                        <Route path="/RecipePage" exact component={RecipePage} />
                        <Route path="/*" exact component={NoPage} />
                  </Switch>
              </BrowserRouter>

                
            </div>
            <SideBar isLoggedIn={isLoggedIn} changeLoginState = {isLoggedIn => setIsLoggedIn(isLoggedIn)}  
            currentUserID={currentUserID} changeCurrentUserID = {currentUserID => 
                {
                    setCurrentUserID(currentUserID);
                    console.log(currentUserID);
                }
            } 
            profileID={profileID} 
            changeProfileID = {newProfileID => 
            {
                setProfileID(newProfileID);
                console.log(newProfileID);
                localStorage.setItem('profileToLoad', JSON.stringify(newProfileID));
                console.log("Added to storage:" + localStorage.getItem('profileToLoad'));
            }}/>
      </div>
  );

}

export default App;
