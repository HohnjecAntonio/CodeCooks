import React, {useEffect, useState} from 'react';
import './Profile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../images/img/user.jpeg";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {fetchUserProfile, followUser, fetchRecipesForUserFeed, fetchOtherProfileByUsername,fetchRecipesByUser} from "../redux/auth/auth.action";
import Loading from './Components/Loading.js';
import {lazy, Suspense} from 'react';

function Profile(props) {
  const jwtToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userProfileInfo = useSelector(state => state.auth.userProfile);
  const profileToLoad = useSelector(state => state.auth.profileToLoad);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const history = useHistory();
  const recipesForFeed = useSelector(state => state.auth.recipesForFeed);

  const Recepti = lazy(() => delayForDemo(import('./Components/Recepti.js')));

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  useEffect(() => {
    dispatch(fetchRecipesForUserFeed());
}, []);


  useEffect(() => {
    dispatch(fetchOtherProfileByUsername(JSON.parse(localStorage.getItem("profileToLoad"))));
  }, []);

  const followUserFunction = async () => {
    console.log("Trying to follow user");
    await dispatch(followUser({ data: {followerId: userProfileInfo.idKorisnik, followingId: profileToLoad.idKorisnik}})).then(() => {
      //history.push('/Profile');
      window.location.reload();
    });
  };
  // State to store user profile information, followers, and following

  const korisnikRecepti = recipesForFeed.filter(recipe  =>
    recipe.autor == profileToLoad.korisnickoIme
  );


  return (
    <div class="profile-box">
      
      <div className='profile-full'>
        <div className="profile-container">
              <h1 className="profile-name">{profileToLoad.imeKorisnik} {profileToLoad.prezimeKorisnik}</h1>
              <br></br>
              <div class="profile-info">
                <h1 class="section-title">Korisničko ime:</h1>
                <p>{profileToLoad.korisnickoIme}</p>
                <br></br>


                {
                  profileToLoad.brojTelefona || profileToLoad.emailKorisnik ?

                  <p><h1 class="section-title">Kontakt informacije:</h1>
                  {
                    profileToLoad.brojTelefona?
                    <p><span class="info-highlight">Broj telefona:</span> {profileToLoad.brojTelefona}</p>
                    :
                    null
                  }
  
                  {
                    profileToLoad.emailKorisnik?
                    <p><span class="info-highlight">Email:</span> {profileToLoad.emailKorisnik}</p>
                    :
                    null
                  }
                  </p>
                  :
                  null
                }
                
                
                
                
              </div>
              <br></br>
              {
                  props.currentUser
                  ?
                  <div>
                    {
                      userProfileInfo.razinaOvlasti == "Admin"
                      ?
                      <div>
                          <a href="/PrivateProfile" >
                            <button class="profile-button">Promjeni postavke</button> 
                          </a>
                          <a href="/MessengerApp">
                            <button class="profile-button" onClick={()=>{localStorage.setItem('friendUsername',JSON.stringify(profileToLoad.korisnickoIme)); localStorage.setItem('userId',JSON.stringify(userProfileInfo.idKorisnik));}}>Chat</button>
                          </a>
                          <button class="profile-button" onClick={followUserFunction}>
                            
                            {
                              profileToLoad.pratiociKorisnika.includes(userProfileInfo.korisnickoIme)
                              ?
                              <p>Prestani pratiti</p>
                              :
                              <p>Zaprati korisnika</p>
                            }
                            
                            
                            </button>
                      </div>
                      :
                      <div>
                        {
                          userProfileInfo.idKorisnik == profileToLoad.idKorisnik
                          ? 
                          <a href="/PrivateProfile">
                          <button class="profile-button">Promjeni postavke</button>
                          </a>
                          :
                          <div className='contactButtons'>
                            <a href="/MessengerApp">
                              <button class="profile-button" onClick={()=>{localStorage.setItem('friendUsername',JSON.stringify(profileToLoad.korisnickoIme)); localStorage.setItem('userId',JSON.stringify(userProfileInfo.idKorisnik));}}>Chat</button>
                            </a>
                            <button class="profile-button" onClick={followUserFunction}>Zaprati korisnika</button>
                          </div>
                        }
                      </div>
                    }


                    
                  </div>
                    :
                    null
            }
          </div>

        <div className="recipe-page">
            <Suspense fallback={<Loading item={'recepata'}/>}>
                <Recepti recepti={korisnikRecepti}/>
            </Suspense>
        </div>
        
      </div> 

      <div className="connections" >
                <div className="followers">
                  <h2>Pratitelji</h2>

                  
                  {
                  profileToLoad.pratiociKorisnika && profileToLoad.pratiociKorisnika.map((follower) => (
                    <p key={follower.idKorisnik}>{follower.korisnickoIme}</p>
                  ))
                  }
                  
                </div>

                <div className="following">
                  <h2>Prati</h2>
                  {

                  profileToLoad.pratiteljiKorisnika && profileToLoad.pratiteljiKorisnika.map((follower) => (
                      <p key={follower.idKorisnik}>{follower.korisnickoIme}</p>
                  ))}
                </div>
        </div>

    </div>
      
      );
    };

function delayForDemo(promise) {
   return new Promise(resolve => {
        setTimeout(resolve, 500);
   }).then(() => promise);
}

export default Profile;
