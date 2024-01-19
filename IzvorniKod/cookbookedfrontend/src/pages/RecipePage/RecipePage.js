import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, fetchVrsteKuhinje, fetchRecipesForUserFeed ,addComment,editComment,deleteComment,deleteRecipe, fetchUserProfile, likeRecipe, saveRecipe, editRecipe} from '../../redux/auth/auth.action.js';
import {fetchRecipeById} from "../../redux/auth/auth.action";
import './RecipePage.css'; // You can create a separate CSS file for styling
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Komentar from "../Components/Komentar";



import { ReactComponent as PencilIcon } from '../../icons/recipePage/pencil-solid.svg';
import { ReactComponent as TrashIcon } from '../../icons/recipePage/trash-solid.svg';
import { ReactComponent as BookmarkIcon } from '../../icons/recipePage/bookmark-regular.svg';
import { ReactComponent as HeartIcon } from '../../icons/recipePage/heart-regular.svg';


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

const editRecipeFunction = async (values) => {
  console.log('handle submit ', values);
  await dispatch(editRecipe({ data: values })).then(() => {
      //history.push('/');
      window.location.reload();
  });
};


const deleteRecipeFunction = async (idKorisnik, idRecept) => {
  await dispatch(deleteRecipe({ data: {
    idKorisnik: idKorisnik,
    idRecept: idRecept
  } })).then(() => {
      //history.push('/');
      window.location.reload();
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

  function returnSastojciList(sastojci){
    var listaSastojaka = "";
    var i = 0;
    sastojci.forEach(element => {
      listaSastojaka+= element.nazivSastojak
      if (i<sastojci.length-1)
      listaSastojaka+=", ";
      i++;

    });
    return listaSastojaka;
  }

  return (
    
    <div>
      <div className="single-recipe-page">

      {
        urediRecept ?
        <div className="recipe-form-container">
        <Formik enableReinitialize={true} onSubmit={(values) => { editRecipeFunction(values); setUrediRecept(false);}} 
          initialValues={
            {
              idRecept: recipe.idRecept || '',
              idAutor: recipe.idAutor || '',
              nazivRecept: recipe.nazivRecept || '',
              sastojci: returnSastojciList(recipe.sastojci) || '',
              vrijemeKuhanja: recipe.vrijemeKuhanja || '',
              priprema: recipe.priprema || '',
              oznaka: recipe.oznaka || ''
            }
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

          <h1>Uredite recept</h1>
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

          <button class="recipe-button" type="submit">Spremi recept</button>
          <button class="recipe-button" onClick={()=>setUrediRecept(false)}>Odustani</button>
        </Form>
        </Formik>
        </div>

        :
        
        <div className="recipe-card">
            <div className="recipe-details">
            {
              props.currentUser
              ?
              
              <div >
              {
                userProfileInfo.razinaOvlasti == "Admin"
                ?
                <div class="recipe-buttons-flex">
                    <button className='recipe-icon-button' onClick={()=> setUrediRecept(true) }><PencilIcon/></button>
                    <button className='recipe-icon-button' onClick={() => deleteRecipeFunction(recipe.idAutor,recipe.idRecept)}><TrashIcon/></button>
                    <button className='recipe-icon-button' onClick={() => saveRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}><BookmarkIcon/></button>
                    <button className='recipe-icon-button' onClick={() => likeRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}><HeartIcon></HeartIcon></button>

                </div>
                :
                <div>
                  {
                     recipe.autor == userProfileInfo.korisnickoIme
                    ?
                      <div class="recipe-buttons-flex">
                        <button className='recipe-icon-button' onClick={()=> setUrediRecept(true) }><PencilIcon/></button>
                        <button className='recipe-icon-button' onClick={() => deleteRecipeFunction(recipe.idAutor,recipe.idRecept)}><TrashIcon/></button>
                      </div>
                      :
                      <div class="recipe-buttons-flex">
                        <button className='recipe-icon-button' onClick={() => saveRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}><BookmarkIcon/></button>
                        <button className='recipe-icon-button' onClick={() => likeRecipeFunction(userProfileInfo.idKorisnik,recipe.idRecept)}><HeartIcon></HeartIcon></button>
                      </div>
                  }
                </div>
              }

              </div>
              :
              null
            }
              <h1 class="recipe-title-recipe-page">{recipe.nazivRecept}</h1>
              <p >Autor: <a href="/Profile" onClick={() => {
                  localStorage.setItem('profileToLoad',JSON.stringify(recipe.autor))
            }}>{recipe.autor}</a></p>
              <p>Vrijeme kuhanja: {recipe.vrijemeKuhanja}</p>
              {
                  recipe.kategorije && recipe.kategorije.length > 0 ?
                  (
                    <p>Kategorija: {recipe.kategorije[0].nazivKategorija}</p>
                  )
                  :
                  (
                  <p>Kategorija: </p> 
                  )
                }

                
                {
                  recipe.vrsteKuhinje && recipe.vrsteKuhinje.length > 0  ?
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
                    <span>{returnSastojciList(recipe.sastojci)}</span>
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
            
            </div>
        </div>
      }
      
      
      
      <div>
      <h1 class='section-title'>Komentari:</h1>
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
              <h1 class="add-comment-title">Dodaj komentar:</h1>
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