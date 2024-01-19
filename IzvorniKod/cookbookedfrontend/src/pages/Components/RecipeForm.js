import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, newRecipe, fetchUserProfile, fetchVrsteKuhinje } from '../../redux/auth/auth.action.js';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import '../ComponentsCss/RecipeForm.css'; // You can create a separate CSS file for styling

function RecipeForm () {
  const dispatch = useDispatch();
  const kategorije = useSelector(state => state.auth.kategorije); // Adjust path according to your store structure
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const userProfileInfo = useSelector(state => state.auth.userProfile);
  const vrKuhinje = useSelector(state => state.auth.vrKuhinje);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchKategorije());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVrsteKuhinje());
  }, [dispatch]);


  const handleSubmit = async (values) => {
    console.log('handle submit ', values);
    await dispatch(newRecipe({ data: values })).then(() => {
        //history.push('/');
        //window.location.reload();
    });
  };

  const initialValues = {
      idKorisnik: userProfileInfo.idKorisnik || '',
      nazivRecept:'',
      sastojci: '',
      idKategorija: '1',
      idVrstaKuhinje: '1',
      priprema: '',
      oznaka: ''
  }

  return (
    <div className="recipe-form-container">
      <Formik enableReinitialize={true} onSubmit={handleSubmit} 
      initialValues={initialValues}>

        <Form>

          <Field
            type="hidden"
            id="idKorisnik"
            name="idKorisnik"
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

          <button className='recipe-button' type="submit">Objavi recept</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RecipeForm;
