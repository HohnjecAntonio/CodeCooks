import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import UserFeed from "./pages/UserFeed/UserFeed";
import Registration from "./pages/Registration";
import * as AuthService from "./redux/auth/auth.action";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import SideBar from "./pages/SideBar";

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

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
                            <NavLink className="Header-button" to="/user-feed">
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
                            <HomePage/>
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
                    </Switch>
                </div>
                <SideBar currentUser={currentUser} changeLoginState = {isLoggedIn => setIsLoggedIn(isLoggedIn)} />
            </div>
        </Router>
    );
}

export default App;
