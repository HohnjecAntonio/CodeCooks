import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipesForUserFeed} from "../../redux/auth/auth.action";

const UserFeed = () => {
    const jwtToken = localStorage.getItem("token");
    const dispatch = useDispatch();
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed); // Adjust path according to your store structure
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, [dispatch]);

    return (
        <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-black">Welcome to Your User Feed!</h1>
            <p className="text-gray-600">Your JWT Token: {jwtToken}</p>
            <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
                {recipesForFeed.map(recipe => (
                    <div key={recipe.idRecept}>
                        <p>{recipe.nazivRecept}</p>
                        <p>{recipe.autor}</p>
                        <p>{recipe.oznaka}</p>
                        <p>{recipe.vrijemeObjave}</p>
                        {recipe.komentari.map(komentar => (
                            <p>{komentar.opisKomentar + " " + komentar.datumKomentar + " " + komentar.korisnik.korisnickoIme}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserFeed;
