import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import UserFeed from "./pages/UserFeed/UserFeed";
import Registration from "./pages/Registration";
import * as AuthService from "./redux/auth/auth.action";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";

function App() {
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
            <div className="bg-gray-900 text-white">
                <nav className="flex items-center justify-between p-4 bg-gray-800">
                    <div className="flex items-center space-x-4">
                        <NavLink to="/" className="text-lg font-semibold">
                            Home
                        </NavLink>

                        {currentUser && (
                            <NavLink to="/user-feed" className="text-lg font-semibold">
                                User feed
                            </NavLink>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <a href="/signin" onClick={logOut} className="text-lg font-semibold cursor-pointer">
                                Logout
                            </a>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <NavLink to="/signin" className="text-lg font-semibold">
                                Login
                            </NavLink>

                            <NavLink to="/signup" className="text-lg font-semibold">
                                Sign up
                            </NavLink>
                        </div>
                    )}
                </nav>

                <div className="container mx-auto mt-3 p-4">
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        {currentUser ? (
                            <Route path="/user-feed">
                                <UserFeed />
                            </Route>
                        ) : null}
                        <Route path="/signin">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Registration />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
