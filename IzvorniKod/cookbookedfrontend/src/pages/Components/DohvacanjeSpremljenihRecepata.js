import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchRecipesForUserFeed,fetchUserProfile} from "../../redux/auth/auth.action";

const DohvacanjeSpremljenihRecepata = () => {
    const dispatch = useDispatch();
    const userProfileInfo = useSelector(state => state.auth.userProfile);

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    if(userProfileInfo.spremljeniReceptiKorisnika != undefined){
        var recepti = userProfileInfo.spremljeniReceptiKorisnika.map(recipe =>
            <div className="recipe-card">
                <a href="/RecipePage" onClick={()=>{
                    localStorage.setItem('recipeToLoad',JSON.stringify(recipe.idRecept));
                }}>
                    <div className="recipe-details">
                        <h2>{recipe.nazivRecept}</h2>
                        {/*<p>Category: {recipe.category}</p>
                            <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                            </ul>*/}
                        <p>Uputstva: {recipe.priprema}</p>
                        <p>Autor: <a href="/Profile" onClick={() => {
                            localStorage.setItem('profileToLoad',JSON.stringify(recipe.autor.korisnickoIme))
                        }}>{recipe.autor.korisnickoIme}</a></p>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div className="single-recipe-page">
            {recepti}
        </div>
    );
};

export default DohvacanjeSpremljenihRecepata;
