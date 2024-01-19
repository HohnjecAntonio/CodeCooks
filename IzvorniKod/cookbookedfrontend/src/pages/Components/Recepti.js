import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../ComponentsCss/Recepti.css'; // You can create a separate CSS file for styling
import {fetchRecipesForUserFeed} from "../../redux/auth/auth.action";


const Recepti = () => {
    const dispatch = useDispatch();
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed);

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, []);

    const kategorijaRecepti = recipesForFeed.filter(recipe  =>{
            if(recipe.kategorije.length>0){
                return recipe.kategorije[0].idKategorija == JSON.parse(localStorage.getItem("kategorijaLoad"))
            }
        }
    );

return (
    <div className="recipe-list-new">
        {kategorijaRecepti.map((recipe) => (
            <div key={recipe.idRecept} className="recipe-card">
                <a href="/RecipePage"
                   onClick={() => {
                       localStorage.setItem('recipeToLoad', JSON.stringify(recipe.idRecept));
                       console.log(recipe.idRecept);
                   }}>
                    <div className="recipe-details">
                        <h2 class="recipe-title-recipe-list">{recipe.nazivRecept}</h2>
                        <p>Autor: 
                            <a href="/Profile" onClick={() => { localStorage.setItem('profileToLoad', JSON.stringify(recipe.autor))}}>
                                {recipe.autor}
                            </a>
                        </p>
                        <p>Vrijeme kuhanja: {recipe.vrijemeKuhanja}</p>
                        {recipe.kategorije[0] ?
                            (<p>Kategorija: {recipe.kategorije[0].nazivKategorija}</p>)
                            : (<p>Kategorija: </p>)}
                        {recipe.vrsteKuhinje[0] ?
                            (<p>Vrste kuhinje: {recipe.vrsteKuhinje[0].nazivVrstaKuhinje}</p>)
                            : (<p>Vrste kuhinje: </p>)}
                    </div>
                </a>
            </div>
        ))}
    </div>
);

}

export default Recepti;