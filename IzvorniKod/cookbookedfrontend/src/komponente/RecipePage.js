import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, fetchRecipesForUserFeed } from '../redux/auth/auth.action.js'; 
import {fetchRecipeById} from "../redux/auth/auth.action";
import './RecipePage.css'; // You can create a separate CSS file for styling

const RecipePage = () => {
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.auth.recipeToLoad);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const recipesForFeed = useSelector(state => state.auth.recipesForFeed);


  useEffect(() => {
    dispatch(fetchRecipesForUserFeed());
}, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipeById(JSON.parse(localStorage.getItem("recipeToLoad"))));
  }, [dispatch]);

/*  
  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      ingredients: ['500g spaghetti', '400g minced beef', '1 onion', '2 cloves garlic', '400g tomato sauce'],
      instructions: 'Cook spaghetti according to package instructions. In a pan, sauté onions and garlic, add minced beef, cook until browned, then add tomato sauce. Serve over cooked spaghetti.',
      category: 'Pasta',
      image: 'images/spaghetti.jpg',
      creator: 'Chef John Doe',
      userID: '1'
    },
    {
      id: 2,
      title: 'Chicken Stir Fry',
      ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
      instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
      category: 'Asian',
      image: 'images/stir_fry.jpg',
      creator: 'Chef Jane Smith',
      userID: '1'
    },
    {
      id: 3,
      title: 'Chicken Stir Fry',
      ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
      instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
      category: 'Asian',
      image: 'images/stir_fry.jpg',
      creator: 'New user',
      userID: '2'
    },
    {
      id: 4,
      title: 'Chicken Stir Fry',
      ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
      instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
      category: 'Asian',
      image: 'images/stir_fry.jpg',
      creator: 'New user',
      userID: '2'
    },
    {
        id: 5,
        title: 'Chicken Stir Fry',
        ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
        instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
        category: 'Asian',
        image: 'images/stir_fry.jpg',
        creator: 'New user',
        userID: '2'
      },
  ]

  const [recipe, setRecipe] = useState({
    id: '',
    title: '',
    ingredients: [],
    instructions: '',
    category: '',
    image: '',
    creator: '',
    userID: ''
  })

  const testings = recipes.filter(recipe  =>
    recipe.id == JSON.parse(localStorage.getItem("recipeToLoad"))
  );

 

  const arrayDataItems = testings.map(recipe => 
    <div className="single-recipe-page">
    <h1>{recipe.title}</h1>
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="recipe-details">
        <p>Category: {recipe.category}</p>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>Instructions: {recipe.instructions}</p>
        <p>Creator: <a href="/Profile" onClick={() => {
                  localStorage.setItem(localStorage.setItem('profileToLoad',JSON.stringify(recipe.userID)))
            }}>{recipe.creator}</a></p>
      </div>
    </div>
  </div>

)*/



  const testings = recipesForFeed.filter(recipe  =>
    recipe.idRecept == JSON.parse(localStorage.getItem("recipeToLoad"))
  );



  const arrayDataItems = testings.map(recipe => 
    <div className="single-recipe-page">
      <div className="recipe-card">

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
            localStorage.setItem('profileToLoad',JSON.stringify(recipe.idRecept))
      }}>{recipe.autor}</a></p>

      <p>Komentari:</p>
      {recipe.komentari.map(komentar => (
          <p>{komentar.opisKomentar + " " + komentar.datumKomentar + " " + komentar.korisnik.korisnickoIme}</p>
      ))}
      </div>

      </div>
  </div>
  );

  console.log("Local Storage get: "+ JSON.parse(localStorage.getItem("recipeToLoad")));

  return (
    
    <div>
      {arrayDataItems}
    </div>
    
  );
};

export default RecipePage;