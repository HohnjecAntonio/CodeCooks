import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import * as AuthService from "./redux/auth/auth.action";
import './App.css';

const RecipePage = lazy(() => import("./pages/RecipePage/RecipePage"));
const SpremljeniRecepti = lazy(() => import("./pages/UserFeed/SpremljeniRecepti"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const UserFeed = lazy(() => import("./pages/UserFeed/UserFeed"));
const SideBar = lazy(() => import("./pages/SideBar"));
const Atributions = lazy(() => import("./pages/AtributionsPage/Atributions"));
const PrivateProfile = lazy(() => import("./pages/PrivateProfilePage/PrivateProfile"));
const RecipeForm = lazy(() => import("./pages/Components/RecipeForm"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const MessengerApp = lazy(() => import("./messenger/MessengerApp"));

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
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
            <div className="App">
                <nav className="Header">
                    <div className="ref">
                        <NavLink className="Header-button" to="/">
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
                            <NavLink className="Header-button" to="/signin">
                                Login
                            </NavLink>

                            <NavLink className="Header-button" to="/signup">
                                Sign up
                            </NavLink>
                        </div>
                    )}
                </nav>

                <div className="Tijelo">
                    <button className="hidden" onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle login</button>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/" exact>
                                <HomePage />
                            </Route>

                            {currentUser && (
                                <Route path="/user-feed">
                                    <UserFeed />
                                </Route>
                            )}

                            <Route path="/signin">
                                <Login />
                            </Route>

                            <Route path="/signup">
                                <Registration />
                            </Route>

                            <Route path="/Profile" exact>
                                <Profile currentUser={currentUser} />
                            </Route>

                            <Route path="/RecipePage">
                                <RecipePage currentUser={currentUser} />
                            </Route>

                            <Route path="/PrivateProfile" exact component={PrivateProfile} />
                            <Route path="/AddRecipe" exact component={RecipeForm} />
                            <Route path="/MessengerApp" exact component={MessengerApp} />
                            <Route path="/SpremljeniRecepti" exact component={SpremljeniRecepti} />
                            <Route path="/Atributions" exact component={Atributions} />
                        </Switch>
                    </Suspense>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <SideBar currentUser={currentUser} changeLoginState={(isLoggedIn) => setIsLoggedIn(isLoggedIn)} />
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
