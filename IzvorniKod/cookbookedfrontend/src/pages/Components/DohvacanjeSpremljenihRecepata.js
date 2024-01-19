import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchRecipesForUserFeed,fetchUserProfile} from "../../redux/auth/auth.action";
import '../ComponentsCss/Recepti.css';


const DohvacanjeSpremljenihRecepata = () => {
    const dispatch = useDispatch();
    const userProfileInfo = useSelector(state => state.auth.userProfile);


    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);

    if(userProfileInfo.spremljeniReceptiKorisnika != undefined){
        var recepti = userProfileInfo.spremljeniReceptiKorisnika.map(recipe =>
            <div key={recipe.idRecept} className="recipe-card">
                <a href="/RecipePage"
                   onClick={() => {
                       localStorage.setItem('recipeToLoad', JSON.stringify(recipe.idRecept));
                       console.log(recipe.idRecept);
                   }}>
                    <div className="recipe-details">
                        <h2 class="recipe-title-recipe-list">{recipe.nazivRecept}</h2>
                        
                            <a class="autor-link" href="/Profile" onClick={() => { localStorage.setItem('profileToLoad', JSON.stringify(recipe.autor.korisnickoIme))}}>
                                <p>Autor: 
                                {recipe.autor.korisnickoIme}
                                </p>
                            </a>
                        
                        <p>Vrijeme kuhanja: {recipe.vrijemeKuhanja}</p>
                        {recipe.kategorije && recipe.kategorije.length >0 ?
                            (<p>Kategorija: {recipe.kategorije[0].nazivKategorija}</p>)
                            : (<p>Kategorija: </p>)}
                        {recipe.vrsteKuhinje && recipe.vrsteKuhinje.length > 0 ?
                            (<p>Vrste kuhinje: {recipe.vrsteKuhinje[0].nazivVrstaKuhinje}</p>)
                            : (<p>Vrste kuhinje: </p>)}
                    </div>
                </a>
            </div>
        );
    }

    return (
       <div>{recepti}</div>
            
        
    );
};

export default DohvacanjeSpremljenihRecepata;
