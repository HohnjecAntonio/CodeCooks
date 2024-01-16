import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipesForUserFeed,fetchUserProfile} from "../../redux/auth/auth.action";

const UserFeed = () => {
    const jwtToken = localStorage.getItem("token");
    const dispatch = useDispatch();
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed); // Adjust path according to your store structure
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const userProfileInfo = useSelector(state => state.auth.userProfile);

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserProfile());
      }, [dispatch]);


    const korisnikRecepti = recipesForFeed.filter(recipe  =>
       userProfileInfo.pratiteljiKorisnika.forEach(element => {
           
           return recipe.autor == element.korisnickoIme

        })
    );


    var arrayDataItems = korisnikRecepti.map(recipe => 
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
            </div>
            </a>
            </div>
        </div>
    );
    

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
            {arrayDataItems}

        </div>
    );
};

export default UserFeed;
