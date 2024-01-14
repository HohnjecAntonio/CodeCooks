import React, {useEffect, useState} from 'react';
import './Profile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../images/img/user.jpeg";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {fetchUserProfile, fetchOtherProfile, followUser} from "../redux/auth/auth.action";


function Profile(props) {
  const jwtToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userProfileInfo = useSelector(state => state.auth.userProfile);
  const profileToLoad = useSelector(state => state.auth.profileToLoad);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOtherProfile(JSON.parse(localStorage.getItem("profileToLoad"))));
  }, [dispatch]);

  const followUser = async () => {
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

  return (
    <div>
      <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
        {profileToLoad.idKorisnik +" " +profileToLoad.korisnickoIme + " " + profileToLoad.imeKorisnik + " " + profileToLoad.prezimeKorisnik + " " + profileToLoad.brojTelefona + " " + profileToLoad.emailKorisnik}
      </div>

      <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
        {userProfileInfo.idKorisnik +" " + userProfileInfo.korisnickoIme + " " + userProfileInfo.imeKorisnik + " " + userProfileInfo.prezimeKorisnik + " " + userProfileInfo.brojTelefona + " " + userProfileInfo.emailKorisnik}
      </div>
      <div className="profile-container">
          

          <div className="profile">
            <h1 className="profile-name">{profileToLoad.imeKorisnik} {profileToLoad.prezimeKorisnik}</h1>

            
            {
              userProfileInfo.idKorisnik == profileToLoad.idKorisnik
              ? 
              <a href="/PrivateProfile" class="private-profile-button">
              <button>Promjeni postavke</button>
            </a>
            :
            <div className='contactButtons'>
              <a href="/MessengerApp">
                <button>Chat</button>
              </a>
              <button onClick={followUser}>Zaprati korisnika</button>
            </div>
            }
            
          </div>


          <div className="connections">
            <div className="followers">
              <h2>Followers</h2>
              {/*
              {newUser.followers.map((follower, index) => (
                <p key={index}>{follower}</p>
              ))}*/}
            </div>

            <div className="following">
              <h2>Following</h2>
              {/*{newUser.following.map((followed, index) => (
                <p key={index}>{followed}</p>
              ))*/}
            </div>
          </div>

          <div className="posts">
            <h2>Recent Posts</h2>
            {/*{newUser.posts.map((post, index) => (
              <div key={index} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p className="post-date">Date: {post.date}</p>
              </div>
            ))}*/}
          </div>
        </div>
    </div>
      
      
      );
    };

export default Profile;
