import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, fetchVrsteKuhinje, fetchRecipesForUserFeed ,addComment,editComment,deleteComment,deleteRecipe, fetchUserProfile, likeRecipe, saveRecipe, editRecipe} from '../redux/auth/auth.action.js'; 
import {fetchRecipeById} from "../redux/auth/auth.action";
import './RecipePage.css'; // You can create a separate CSS file for styling
import { ErrorMessage, Field, Form, Formik } from 'formik';

const RecipePage = (props) => {
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.auth.recipeToLoad);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const userProfileInfo = useSelector(state => state.auth.userProfile);
  const kategorije = useSelector(state => state.auth.kategorije); 
  const vrKuhinje = useSelector(state => state.auth.vrKuhinje);


  const [urediRecept,setUrediRecept] = useState(false);

  useEffect(() => {
    dispatch(fetchKategorije());
}, []);

  useEffect(() => {
    dispatch(fetchRecipeById(JSON.parse(localStorage.getItem("recipeToLoad"))));
  }, []);

  

  useEffect(() => {
    dispatch(fetchVrsteKuhinje());
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  console.log(recipe);


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
      window.location.reload();
  });
};

const editRecipeFunction = async (values) => {
  console.log('handle submit ', values);
  await dispatch(editRecipe({ data: values })).then(() => {
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

const likeRecipeFunction = async (idKorisnik, idRecept) => {
  await dispatch(likeRecipe({ data: {
    idKorisnik: idKorisnik,
    idRecept: idRecept
  } })).then(() => {
      //history.push('/');
      //window.location.reload();
  });
};

const saveRecipeFunction = async (idKorisnik, idRecept) => {
  await dispatch(saveRecipe({ data: {
    idKorisnik: idKorisnik,
    idRecept: idRecept
  } })).then(() => {
      //history.push('/');
      //window.location.reload();
  });
};

  console.log("Local Storage get: "+ JSON.parse(localStorage.getItem("recipeToLoad")));
  
  function Komentar(props){
    const [urediKomentar,setUrediKomentar] = useState(false);

    return(
          <div class="komentar">
            {/*<span>{props.komentarKorisnikId} {props.komentarKorisnikIme} {props.komentarDatum}</span>*/}
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
        
                  <button className='recipe-button' type="submit">Spremi komentar</button>
                  
                  </Form>
                </Formik>
                :
                <p></p>
              
              
            }
            {/*<p>{props.komentarTekst}</p>*/}
            
            {
              props.komentarKorisnikId == userProfileInfo.idKorisnik || userProfileInfo.razinaOvlasti == "Admin"
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
      <div className="single-recipe-page">
      {
        urediRecept ?
        <Formik enableReinitialize={true} onSubmit={(values) => { editRecipeFunction(values); setUrediRecept(false);}} 
          initialValues={
            recipe
          }>

        <Form>
          
        <Field
            type="hidden"
            id="idRecept"
            name="idRecept"
          />

          <Field
            type="hidden"
            id="idAutor"
            name="idAutor"
          />

          <h1>Izradite novi recept</h1>
          <label htmlFor="nazivRecept">Naziv recepta:</label>
          <Field
            type="text"
            id="nazivRecept"
            name="nazivRecept"
          />

          <label htmlFor="idVrstaKuhinje">Vrsta kuhinje:</label>
          <select
              id="idVrstaKuhinje"
              name="idVrstaKuhinje"
          >
            {vrKuhinje.map(vrsta => (
                <option key={vrsta.idVrstaKuhinje} value={vrsta.idVrstaKuhinje}>
                  {vrsta.nazivVrstaKuhinje}
                </option>
            ))}
          </select>

          <label htmlFor="sastojci">Sastojci:</label>
          <Field
            type="text"
            id="sastojci"
            name="sastojci"
          />

          <label htmlFor="kategorija">Izaberite kategoriju:</label>
          <select
            id="idKategorija"
            name="idKategorija"
          >
            {kategorije.map(kategorija => (
                  <option key={kategorija.idKategorija} value={kategorija.idKategorija}>
                      {kategorija.nazivKategorija}
                  </option>
              ))}
          </select>

          {

          /*
          <label htmlFor="image">Odaberite sliku:</label>
          <input
            className='image_upload'
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />*/
          }

        <label htmlFor="priprema">Vrijeme kuhanja:</label>
          <Field
            type="time"
            id="vrijemeKuhanja"
            name="vrijemeKuhanja"
          />

          <label htmlFor="priprema">Uputstva:</label>
          <Field
            component="textarea"
            type="text"
            id="priprema"
            name="priprema"
          />

          <label htmlFor="oznaka">Dodatne napomene:</label>
          <Field
              component="textarea"
              type="text"
              id="oznaka"
              name="oznaka"
          />

          <button type="submit">Spremi recept</button>
        </Form>
        </Formik>

        :
        
        <div className="recipe-card">
            <div className=''> </div>
            <div className="recipe-details">
              <h2 style={{color: 'black' , fontWeight: 'bold'}}>{recipe.nazivRecept}</h2>
              <p >Autor: <a href="/Profile" onClick={() => {
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

                {
                  recipe.sastojci ?
                  <p>
                    Sastojci: 
                    <span>
                    {
                    recipe.sastojci.map((sastojak) =>
                    (
                      <span>{sastojak.nazivSastojka} </span>
                    ))
                    }
                    </span>
                  </p>
                  :
                  <p>
                    Sastojci: 
                  </p>
                }
                <p>Oznaka: {recipe.oznaka}</p>
                <p>Uputstva: {recipe.priprema}</p>
            {
              props.currentUser
              ?
              
              <div>
              {
                userProfileInfo.razinaOvlasti == "Admin"
                ?
                <div>
                    <button className='recipe-button' onClick={()=> setUrediRecept(true) }>Uredi recept</button>
                    <button className='recipe-button' onClick={() => deleteRecipeFunction(recipe.idAutor,recipe.idRecept)}>Izbriši recept</button>
                    <button className='recipe-button' onClick={() => saveRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}>Spremi recept</button>
                    <button className='recipe-button' onClick={() => likeRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}>Označi recept</button>

                </div>
                :
                <div>
                  {
                     recipe.autor == userProfileInfo.korisnickoIme
                    ?
                      <div>
                        <button className='recipe-button' onClick={()=> setUrediRecept(true) }>Uredi recept</button>
                        <button className='recipe-button' onClick={() => deleteRecipeFunction(recipe.idAutor,recipe.idRecept)}>Izbriši recept</button>
                      </div>
                      :
                      <div>
                        <button className='recipe-button' onClick={() => saveRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}>Spremi recept</button>
                        <button className='recipe-button' onClick={() => likeRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}>Označi recept</button>
                      </div>
                  }
                </div>
              }
              
              
              </div>
              :
              null
            }
            </div>
        </div>
      }
      
      
      {
       props.currentUser
            ?
          <div>
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

              <button className='recipe-button' type="submit">Dodaj komentar</button>
              
              </Form>
            </Formik>
            </div>
        
        :
        null
      }
      <div>
      <p>Komentari:</p>
        {
          recipe.komentari
          ?
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
            <div className="container mx-auto my-10 p-6  shadow-md rounded-md" style={{backgroundColor:'#23232e', color:'white'}}>

            
            <p > {'Korisnik: '+ komentar.korisnik.korisnickoIme}         {'Datum: '+ komentar.datumKomentar}</p>
            
            <p>Opis: {komentar.opisKomentar}</p>
            </div>
          </div>
            
          ))}
          </div>
          
          :

          null

        }
        
        
        </div>
      </div>
    </div>
    
  );
};

export default RecipePage;