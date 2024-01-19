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
    }, []);

    useEffect(() => {
        dispatch(fetchUserProfile());
      }, []);


    const korisnikRecepti = recipesForFeed.filter(recipe  =>{
        if(userProfileInfo.pratiteljiKorisnika)
            userProfileInfo.pratiteljiKorisnika.forEach(element => {
                
                return recipe.autor == element.korisnickoIme

            })
        }
    );
    const recipeCardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        
      };
    
      const recipeCard = {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        margin: '8px',
        width: '30%', 
        backgroundImage: 'url("/pexels-karolina-grabowska-4032977.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        
      };
      
      const textElementStyle = {
        marginLeft: '90px', 
      };

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
            {/*<p className="text-gray-600">Your JWT Token: {jwtToken}</p>*/}
            <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <div style={recipeCardContainerStyle}>
                {recipesForFeed.map(recipe => (
                    <div key={recipe.idRecept} style={recipeCard }>
                        <p style={textElementStyle}>{recipe.nazivRecept}</p>
                        <p style={textElementStyle}>{recipe.autor}</p>
                        <p style={textElementStyle}>{recipe.oznaka}</p>
                        <p style={textElementStyle}>{recipe.vrijemeObjave}</p>
                        
                        {recipe.komentari.map(komentar => (
                            <p style={textElementStyle}>{komentar.opisKomentar + " " + komentar.datumKomentar + " " + komentar.korisnik.korisnickoIme}</p>
                        ))}
                    </div>
                ))}
            </div>
            {arrayDataItems}

        </div></div>
    );
};

export default UserFeed;
