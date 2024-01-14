import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, newRecipe, fetchUserProfile } from '../redux/auth/auth.action.js';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import './RecipeForm.css'; // You can create a separate CSS file for styling

function RecipeForm () {
  const dispatch = useDispatch();
  const kategorije = useSelector(state => state.auth.kategorije); // Adjust path according to your store structure
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const userProfileInfo = useSelector(state => state.auth.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchKategorije());
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
      naziv_recept:'',
      sastojci: '',
      id_kategorija: '1',        
      priprema: ''
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
          <label htmlFor="naziv_recept">Naziv recepta:</label>
          <Field
            type="text"
            id="naziv_recept"
            name="naziv_recept"
          />

          <label htmlFor="sastojci">Sastojci:</label>
          <Field
            type="text"
            id="sastojci"
            name="sastojci"
          />

          <label htmlFor="kategorija">Izaberite kategoriju:</label>
          <select
            id="id_kategorija"
            name="id_kategorija"
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

          <label htmlFor="priprema">Uputstva:</label>
          <Field
            component="textarea"
            type="text"
            id="priprema"
            name="priprema"
          />

          <button type="submit">Submit Recipe</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RecipeForm;
