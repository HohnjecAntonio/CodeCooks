import React, { useState, useEffect } from 'react';
import './PrivateProfile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../images/img/user.jpeg";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {fetchUserProfile, updateUserProfile, deleteUserAction, fetchOtherProfileByUsername} from "../redux/auth/auth.action";

const PrivateProfile = () => {
  const jwtToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userProfileInfo = useSelector(state => state.auth.profileToLoad); // Adjust path according to your store structure
  const kategorije = useSelector(state => state.auth.kategorije);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchOtherProfileByUsername(JSON.parse(localStorage.getItem("profileToLoad"))));
  }, [dispatch]);


  // Handle form submission
  const handleSubmit = async (values) => {
    console.log('handle submit ', values);
    await dispatch(updateUserProfile({ data: values })).then(() => {
        //history.push('/Profile');
        //window.location.reload();
    });
  };


  const deleteUserFunction = async (idKorisnik) => {
    await dispatch(deleteUserAction({ data: {
      idKorisnik: idKorisnik
    } })).then(() => {
        //history.push('/Profile');
        //window.location.reload();
    });
  };

  return (
    <div className="profile-settings-container">
      
      <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
        {userProfileInfo.korisnickoIme + " " + userProfileInfo.imeKorisnik + " " + userProfileInfo.prezimeKorisnik + " " + userProfileInfo.brojTelefona + " " + userProfileInfo.emailKorisnik}
      </div>

      <h2>Profile Settings</h2>
      <Formik enableReinitialize="true" initialValues={userProfileInfo} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="hidden"
            id="idKorisnik"
            name="idKorisnik"
          />
          <label htmlFor="name">Korisničko ime:</label>
          <Field
            type="text"
            id="korisnickoIme"
            name="korisnickoIme"
          />

          <label htmlFor="ime">Ime:</label>
          <Field
            type="text"
            id="imeKorisnik"
            name="imeKorisnik"
          
          />
          <label htmlFor="ime">Prezime:</label>
          <Field
            type="text"
            id="prezimeKorisnik"
            name="prezimeKorisnik"
          />

          <label htmlFor="email">Email:</label>
          <Field
            type="email"
            id="emailKorisnik"
            name="emailKorisnik"
            
          />

          <label htmlFor="brojTelefona">Broj telefona:</label>
          <Field
            type="text"
            id="brojTelefona"
            name="brojTelefona"
          />

          <label for="dostupnost">Dostupnost:</label>

          <label>From: 
          <Field type="time" id="dostupanOd" name="dostupanOd" min="00:00" max="24:00" 
           />
          </label>
          <label>To: <Field type="time" id="dostupanDo" name="dostupanDo" min="00:00" max="24:00" 
           /></label>

          <label>
            Primaj poruke?:
            <Field
              className='checkboxSetting'
              type="checkbox"
              id="primajPoruke"
              name="primajPoruke"
             
            />
          </label>

          <label>
            Primaj obavijesti?:
            <Field
              className='checkboxSetting'
              type="checkbox"
              id="primajObavijesti"
              name="primajObavijesti"
             
            />
          </label>

          <button type="submit">Spremi</button>
          
        </Form>
      </Formik>
      <a href="#" onClick={() => deleteUserFunction(userProfileInfo.idKorisnik)} class="private-profile-button">
        <button>Izbriši profil</button>
      </a>
      <a href="/Profile" class="private-profile-button">
        <button>Odustani</button>
      </a>
    </div>
  );
};

export default PrivateProfile;