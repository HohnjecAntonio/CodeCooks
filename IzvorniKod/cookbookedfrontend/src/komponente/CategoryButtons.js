import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchRecipesForUserFeed, fetchKategorije} from "../redux/auth/auth.action";
import './CategoryButtons.css'


const CategoryButtons = () => {

  const dispatch = useDispatch();
  const categories = useSelector(state => state.auth.kategorije); // Adjust path according to your store structure
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const recipesForFeed = useSelector(state => state.auth.recipesForFeed); // Adjust path according to your store structure

  useEffect(() => {
    dispatch(fetchRecipesForUserFeed());
}, [dispatch]);


useEffect(() => {
    dispatch(fetchKategorije());
}, [dispatch]);



const kategorijaRecepti = recipesForFeed.filter(recipe  =>{
  if(recipe.kategorije.length>0){
    return recipe.kategorije[0].idKategorija == JSON.parse(localStorage.getItem("categoryToLoad"))
  }
}
);


const arrayDataItems = kategorijaRecepti.map(recipe => 
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
            localStorage.setItem('profileToLoad',JSON.stringify(recipe.autor))
      }}>{recipe.autor}</a></p>
    </div>
    </a>
    </div>
</div>
);
  

  return (
      <div>
        
      
        <div className='Forma'>
          <h2 style={{ fontSize: '75px' }}>Categories</h2>
          {error && <p>Error: {error}</p>}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map((category) => (
              <button
                style={{
                  margin: '20px',
                  padding: '20px',
                  backgroundColor: 'green',
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  width: '300px',
                  textAlign: 'center',
                }}
              >
                {
                <a href='/Categories' onClick={()=>localStorage.setItem('categoryToLoad', JSON.stringify(category.idKategorija))} style={{ fontSize: '25px', color: 'white' }}>
                  {category.nazivKategorija}
                </a>
              }
              </button>
            ))}
          </div>
        </div>


        <div className="recipe-list">
                
         {arrayDataItems}
        </div>
      </div>
  );
};

export default CategoryButtons;

