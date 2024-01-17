import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchRecipesForUserFeed,fetchUserProfile} from "../../redux/auth/auth.action";


const SpremljeniRecepti = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed); 
    const userProfileInfo = useSelector(state => state.auth.userProfile);

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserProfile());
      }, [dispatch]);


    
      if(userProfileInfo.spremljeniReceptiKorisnika != undefined){
        var arrayDataItems = userProfileInfo.spremljeniReceptiKorisnika.map(recipe => 
            <div className="single-recipe-page">
            <div className="recipe-card">
            <a href="/RecipePage" onClick={()=>{localStorage.setItem('recipeToLoad',JSON.stringify(recipe.idRecept)); console.log(recipe.idRecept);}}>
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
        </div>
        );
        }


    return (
        <div className='px-20'>
                
            <div className="recipe-page">
                <h1>Spremljeni recepti</h1>
                
                {arrayDataItems}
            </div>
      
            
        </div>
    );
};

export default SpremljeniRecepti;
