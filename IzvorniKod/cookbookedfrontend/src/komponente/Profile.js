import React, { useState } from 'react';
import './Profile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../images/img/user.jpeg";
function Profile() {
  // State to store user profile information, followers, and following
  const [userProfile, setUserProfile] = useState({
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
  });

  return (
    <div className="profile-container">
          

          <div className="profile">
            <img src={userProfile.profilePicture} alt="Profile Picture" className="profile-picture" />
            <h1 className="profile-name">{userProfile.name}</h1>
            <p className="profile-bio">{userProfile.bio}</p>

            {
            /*<div className="social-icons">
              <a href={userProfile.socialMedia.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href={userProfile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href={userProfile.socialMedia.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
              </div>*/ 
            }
            <div className='contactButtons'>
              <a href="/Chat">
              <button>Chat</button>
              </a>
            </div>
          </div>
          <a href="/PrivateProfile" class="private-profile-button">
            <button>Promjeni postavke</button>
          </a>
          <div className="connections">
            <div className="followers">
              <h2>Followers</h2>
              {userProfile.followers.map((follower, index) => (
                <p key={index}>{follower}</p>
              ))}
            </div>

            <div className="following">
              <h2>Following</h2>
              {userProfile.following.map((followed, index) => (
                <p key={index}>{followed}</p>
              ))}
            </div>
          </div>

          <div className="posts">
            <h2>Recent Posts</h2>
            {userProfile.posts.map((post, index) => (
              <div key={index} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p className="post-date">Date: {post.date}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default Profile;
