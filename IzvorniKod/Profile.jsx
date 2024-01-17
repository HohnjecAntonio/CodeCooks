import React, {useEffect, useState} from 'react';
import './Profile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../images/img/user.jpeg";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {fetchUserProfile, fetchOtherProfile, followUser, fetchRecipesForUserFeed, fetchOtherProfileByUsername} from "../redux/auth/auth.action";


function Profile(props) {
  const jwtToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userProfileInfo = useSelector(state => state.auth.userProfile);
  const profileToLoad = useSelector(state => state.auth.profileToLoad);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const history = useHistory();
  const recipesForFeed = useSelector(state => state.auth.recipesForFeed);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipesForUserFeed());
}, [dispatch]);


  useEffect(() => {
    dispatch(fetchOtherProfileByUsername(JSON.parse(localStorage.getItem("profileToLoad"))));
  }, [dispatch]);

  const followUserFunction = async () => {
    console.log("Trying to follow user");
    await dispatch(followUser({ data: {followerId: userProfileInfo.idKorisnik, followingId: profileToLoad.idKorisnik}})).then(() => {
      //history.push('/Profile');
      //window.location.reload();
    });
  };
  // State to store user profile information, followers, and following

  const profiles = [
    {
      userID: '1',
      name: 'John Doe',
      bio: 'Web Developer | Explorer | Coffee Lover',
      profilePicture: profilePictureTemp,
      socialMedia: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
      },
      posts: [
        {
          title: 'Post Title 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          date: 'January 1, 2023',
        },
        {
          title: 'Post Title 2',
          content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          date: 'January 2, 2023',
        },
      ],
      followers: ['Follower1', 'Follower2', 'Follower3'],
      following: ['Following1', 'Following2'],
    },
    {
      userID: "2",
      name: 'Other user',
      bio: 'Web Developer | Explorer | Coffee Lover',
      profilePicture: profilePictureTemp,
      socialMedia: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
      },
      posts: [
        {
          title: 'Post Title 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          date: 'January 1, 2023',
        },
        {
          title: 'Post Title 2',
          content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          date: 'January 2, 2023',
        },
      ],
      followers: ['Follower1', 'Follower2', 'Follower3'],
      following: ['Following1', 'Following2'],
    }

  ]


  const korisnikRecepti = recipesForFeed.filter(recipe  =>
    recipe.autor == profileToLoad.korisnickoIme
  );


  const arrayDataItems = korisnikRecepti.map(recipe => 
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
    <div>
      <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md" style={{ display: 'flex', flexDirection: 'row' , justifyContent: 'space-between'}}>
      <div style={{marginLeft: '50px', alignSelf: 'center'}}>
            <p>ID Korisnika: {profileToLoad.idKorisnik}</p>
            <p>Korisničko ime: {profileToLoad.korisnickoIme}</p>
            <p>Ime: {profileToLoad.imeKorisnik}</p>
            <p>Prezime:{profileToLoad.prezimeKorisnik}</p>
            <p>Broj telefona: {profileToLoad.brojTelefona}</p>
            <p>Email: {profileToLoad.emailKorisnik}</p>
          </div>
      <div className="profile-container">
          

          <div className="profile">
            <h1 className="profile-name">{profileToLoad.imeKorisnik} {profileToLoad.prezimeKorisnik}</h1>
            {
                props.currentUser
                ?
                <div>
                  {
                    props.isAdmin 
                    ?
                    <div>
                        <a href="/PrivateProfile" class="private-profile-button">
                          <button>Promjeni postavke</button> 
                        </a>
                        <a href="/MessengerApp">
                          <button onClick={()=>{localStorage.setItem('friendId',JSON.stringify(profileToLoad.idKorisnik)); localStorage.setItem('userId',JSON.stringify(userProfileInfo.idKorisnik));}}>Chat</button>
                        </a>
                        <button onClick={followUserFunction}>Zaprati korisnika</button>
                    </div>
                    :
                    <div>
                      {
                        userProfileInfo.idKorisnik == profileToLoad.idKorisnik
                        ? 
                        <a href="/PrivateProfile" class="private-profile-button">
                        <button>Promjeni postavke</button>
                        </a>
                        :
                        <div className='contactButtons'>
                          <a href="/MessengerApp">
                            <button onClick={()=>{localStorage.setItem('friendId',JSON.stringify(profileToLoad.idKorisnik)); localStorage.setItem('userId',JSON.stringify(userProfileInfo.idKorisnik));}}>Chat</button>
                          </a>
                          <button onClick={followUserFunction}>Zaprati korisnika</button>
                        </div>
                      }
                    </div>
                  }


                  
                </div>
                  :
                  null
          }
          </div>


          <div className="connections">
            <div className="followers">
              <h2>Followers</h2>

              
              {
              profileToLoad.pratiociKorisnika && profileToLoad.pratiociKorisnika.map((follower) => (
                <p key={follower.idKorisnik}>{follower.korisnickoIme}</p>
              ))
              }
              
            </div>

            <div className="following">
              <h2>Following</h2>
              {

              profileToLoad.pratiteljiKorisnika && profileToLoad.pratiteljiKorisnika.map((follower) => (
                  <p key={follower.idKorisnik}>{follower.korisnickoIme}</p>
              ))}
            </div>
          </div>

          
        </div>
    </div>
    <div className="posts">
            <h2>Recent Posts</h2>
            {arrayDataItems}
          </div>
    </div>
      
      );
    };

export default Profile;