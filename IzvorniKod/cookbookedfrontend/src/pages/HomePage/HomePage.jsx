import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije } from '../../redux/auth/auth.action.js'; // Import the action
import './HomePage.css'; // You can create a separate CSS file for styling
import {fetchRecipesForUserFeed} from "../../redux/auth/auth.action";


const HomePage = () => {
    const dispatch = useDispatch();
    const kategorije = useSelector(state => state.auth.kategorije); 
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed); 

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, []);
/*
    useEffect(() => {
        dispatch(fetchKategorije());
    }, []);*/

    return (
        <div className='px-20'>
            <h1>Dobro došli na CookBooked!</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {/*<h3 className='text-4xl mt-5 mb-3'>Kategorije</h3>
            <div>
                {kategorije.map(kategorija => (
                    <div key={kategorija.idKategorija}>
                        {kategorija.nazivKategorija}
                    </div>
                ))}
                </div>*/}
            <div className="recipe-page">
            <h1 style={{ fontSize: '75px' , fontWeight: 'bold'}}>CookBooked</h1>
            <h1 style={{ fontSize: '50px' }}>Recipes</h1>
          <div className="recipe-list">
            
            {recipesForFeed.map((recipe) => (
              <div key={recipe.idRecept} className="recipe-card">

                <a href="/RecipePage" style={{ fontWeight: 'bold' , fontSize: '20px', color: '#000'}} onClick={()=>{localStorage.setItem('recipeToLoad',JSON.stringify(recipe.idRecept)); console.log(recipe.idRecept);}}>
                <div className="recipe-details">
                  <h2>{recipe.nazivRecept}</h2>
                  <p>Autor: <a href="/Profile" onClick={() => {
                      localStorage.setItem('profileToLoad',JSON.stringify(recipe.autor))
                }}>{recipe.autor}</a></p>
                <p>Vrijeme kuhanja: {recipe.vrijemeKuhanja}</p>
                {
                  recipe.kategorije[0] ?
                  (
                    <p>Kategorija: {recipe.kategorije[0].nazivKategorija}</p>
                  )
                  :
                  (
                  <p>Kategorija: </p> 
                  )
                }

                {
                  recipe.vrsteKuhinje[0] ?
                  (
                    <p>Vrste kuhinje: {recipe.vrsteKuhinje[0].nazivVrstaKuhinje}</p>
                  )
                  :
                  (
                  <p>Vrste kuhinje: </p> 
                  )
                }
                </div>
                </a>
              </div>
            ))}
          </div>
      
    </div>
        </div>
    );
};

export default HomePage;
