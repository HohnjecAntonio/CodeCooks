import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, fetchRecipesForUserFeed ,addComment,editComment,deleteComment,deleteRecipe, fetchUserProfile} from '../redux/auth/auth.action.js'; 
import {fetchRecipeById} from "../redux/auth/auth.action";
import './RecipePage.css'; // You can create a separate CSS file for styling
import { ErrorMessage, Field, Form, Formik } from 'formik';

const RecipePage = () => {
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.auth.recipeToLoad);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const recipesForFeed = useSelector(state => state.auth.recipesForFeed);
  const userProfileInfo = useSelector(state => state.auth.userProfile);


  useEffect(() => {
    dispatch(fetchRecipesForUserFeed());
}, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipeById(JSON.parse(localStorage.getItem("recipeToLoad"))));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  console.log(recipe);
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


const addCommentFunction = async (values) => {
  console.log('handle submit ', values);
  await dispatch(addComment({ data: values })).then(() => {
      //history.push('/');
      window.location.reload();
  });
};



const deleteCommentFunction = async (idKomentar, idKorisnik, idRecept) => {
  await dispatch(deleteComment({ data: {
    idKomentar: idKomentar,
    idKorisnik: idKorisnik,
    idRecept: idRecept
  } })).then(() => {
      //history.push('/');
      //window.location.reload();
  });
};

const deleteRecipeFunction = async (idKorisnik, idRecept) => {
  await dispatch(deleteRecipe({ data: {
    idKorisnik: idKorisnik,
    idRecept: idRecept
  } })).then(() => {
      //history.push('/');
      //window.location.reload();
  });
};

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

      {
        recipe.autor == userProfileInfo.korisnickoIme
        ?
        <button onClick={() => deleteRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}>Izbriši recept</button>
        :
        null
      }
      </div>

      

      </div>
      <p>Komentari:</p>
      <Formik enableReinitialize="true" initialValues={
        {
        idKorisnik: userProfileInfo.idKorisnik || '',
        idRecept: recipe.idRecept || '',
        komentar: ''
      }
        } onSubmit={addCommentFunction}>
        <Form>
          <h1>Dodaj komentar:</h1>
          <Field
            type="hidden"
            id="idKorisnik"
            name="idKorisnik"
          />

          <Field
            type="hidden"
            id="idRecept"
            name="idRecept"
          />
          
          <Field
            component="textarea"
            type="text"
            id="opisKomentar"
            name="opisKomentar"
          />

          <button type="submit">Dodaj komentar</button>
          
          </Form>
        </Formik>
        <div>
        {recipe.komentari.map(komentar => (
          <div>

            <Komentar
              komentarId = {komentar.idKomentar}
              komentarTekst= {komentar.opisKomentar}
              komentarDatum = {komentar.datumKomentar}
              komentarKorisnikIme = {komentar.korisnik.korisnickoIme}
              komentarKorisnikId = {komentar.korisnik.idKorisnik}
              recipeId = {JSON.parse(localStorage.getItem("recipeToLoad"))}


            
            />
            <p>{komentar.opisKomentar + " " + komentar.datumKomentar + " " + komentar.korisnik.korisnickoIme}</p>
          </div>
            
        ))}
        </div>
  </div>
  );

  

  console.log("Local Storage get: "+ JSON.parse(localStorage.getItem("recipeToLoad")));
  
  function Komentar(props){
    const [urediKomentar,setUrediKomentar] = useState(false);

    return(
          <div class="komentar">
            <span>{props.komentarKorisnikId} {props.komentarKorisnikIme} {props.komentarDatum}</span>
            {
              urediKomentar ?
              
              
              <Formik enableReinitialize="true" initialValues={
                {
                  idKomentar: props.komentarId || '',
                  idKorisnik: props.komentarKorisnikId || '',
                  idRecept: props.recipeId || '',
                  opisKomentar:  props.komentarTekst || ''
                }
                } onSubmit={
                  async (values)=>{
                    setUrediKomentar(false)
                    console.log('handle submit ', values);
                    await dispatch(editComment({ data: values })).then(() => {
                        //history.push('/');
                        //window.location.reload();
                    });
                }}>
                <Form>
                  <h1>Uredi komentar:</h1>
                  <Field
                    type="hidden"
                    id="idKomentar"
                    name="idKomentar"
                  />

                  <Field
                    type="hidden"
                    id="idKorisnik"
                    name="idKorisnik"
                  />
        
                  <Field
                    type="hidden"
                    id="idRecept"
                    name="idRecept"
                  />
                  
                  <Field
                    component="textarea"
                    type="text"
                    id="opisKomentar"
                    name="opisKomentar"
                  />
        
                  <button type="submit">Spremi komentar</button>
                  
                  </Form>
                </Formik>
                :
                <p>{props.komentarTekst}</p>
              
            }
            
            
            {
              props.komentarKorisnikId == userProfileInfo.idKorisnik
              ?
              <div>
              <button onClick={()=> setUrediKomentar(true)}>Uredi komentar</button>
              <button onClick={() => deleteCommentFunction(props.komentarId,props.komentarKorisnikId,props.recipeId)}>Izbriši komentar</button>
              </div>
              :
              null
            }
          </div>
          );
  }


  return (
    
    <div>
      {arrayDataItems}
      {
      
      
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
          {/*<p>Autor: <a href="/Profile" onClick={() => {
              localStorage.setItem('profileToLoad',JSON.stringify(recipe.autor.idKorisnik))
        }}>{recipe.autor.korisnickoIme}</a></p>*/}
        </div>

        </div>
      </div>}
    </div>
    
  );
};

export default RecipePage;