import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { lazy } from 'react';

import UserFeed from "./pages/UserFeed/UserFeed";
import Registration from "./pages/Registration";
import * as AuthService from "./redux/auth/auth.action";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import SideBar from "./pages/SideBar";
import Profile from "./pages/Profile";

import RecipeForm from "./komponente/RecipeForm";
import PrivateProfile from "./komponente/PrivateProfile";
import RecipePage from "./komponente/RecipePage";
import CategoryButtons from './komponente/CategoryButtons';
import MessengerApp from './messenger/MessengerApp';
import SpremljeniRecepti from "./pages/UserFeed/SpremljeniRecepti";

import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfile} from "./redux/auth/auth.action";

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [currentUser, setCurrentUser] = useState(undefined);
    // const SideBarLazy = lazy(() => SideBar());
    // const UserFeedLazy = lazy(() => UserFeed());
    // const RegistrationLazy = lazy(() => Registration());
    // const LoginLazy = lazy(() => Login());
    // const HomePageLazy = lazy(() => HomePage());
    // const ProfilerLazy = lazy(() => Profile());
    // const RecipeFormLazy = lazy(() => RecipeForm());
    // const PrivateProfileLazy = lazy(() => PrivateProfile());
    // const RecipePageLazy = lazy(() => RecipePage());
    // const CategoryButtonsLazy = lazy(() => CategoryButtons());
    // const MessengerAppLazy = lazy(() => MessengerApp());
    // const SpremljeniReceptiLazy = lazy(() => SpremljeniRecepti());

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await AuthService.getCurrentUser();
                if (user) {
                    setCurrentUser(user);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const logOut = () => {
        AuthService.logoutUser();
    };




    return (
        <Router>
            <div className = "App">
                <nav className = "Header">
                    <div className="ref">
                        <NavLink className = "Header-button"  to="/">
                            Home
                        </NavLink>

                        {currentUser && (
                            <NavLink to="/user-feed" className="Header-button">
                                User feed
                            </NavLink>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="ref">
                            <a className="Header-button" href="/signin" onClick={logOut}>
                                Logout
                            </a>
                            <a className="Header-button" href="/Profile">
                                Profil
                            </a>
                        </div>
                    ) : (
                        <div className="ref">
                            <NavLink className = "Header-button" to="/signin">
                            Login
                            </NavLink>

                            <NavLink className = "Header-button" to="/signup">
                                Sign up
                            </NavLink>
                        </div>
                    )}
                </nav>

                <div className="Tijelo">
                    <button className = "hidden" onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle login</button>
                    <Switch>

                        <Route path="/" exact>
                            {<HomePage/>}

                        </Route>

                        {currentUser ? (
                            <Route path="/user-feed">
                                <UserFeed/>
                            </Route>
                        ) : null}

                        <Route path="/signin">
                            <Login/>
                        </Route>

                        <Route path="/signup">
                            <Registration/>
                        </Route>


                        <Route path="/Profile" exact>
                            {<Profile currentUser={currentUser}
                                
                                />}
                        </Route>

                        <Route path="/RecipePage">
                            {<RecipePage currentUser={currentUser}
                                ></RecipePage>}
                            </Route> 

                        <Route path="/PrivateProfile" exact component={PrivateProfile} />
                        <Route path="/AddRecipe" exact component={RecipeForm} />
                        <Route path="/MessengerApp" exact component={MessengerApp} />
                        <Route path="/Categories" exact component={CategoryButtons}/>
                        <Route path="/SpremljeniRecepti" exact component={SpremljeniRecepti}/>
                    </Switch>
                </div>
                <SideBar currentUser={currentUser} changeLoginState = {isLoggedIn => setIsLoggedIn(isLoggedIn)} />
            </div>
        </Router>
    );
}

export default App;
