import React, { useState } from 'react';
import './Profile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../../images/img/user.jpeg";


function Profile(props) {

  
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

 

  const [userProfile, setUserProfile] = useState({
    userID:'',
    name: '',
    bio: '',
    profilePicture: '',
    posts: [
      {
        title: '',
        content: '',
        date: '',
      },
      {
        title: '',
        content: '',
        date: '',
      },
    ],
    followers: ['Follower1', 'Follower2', 'Follower3'],
    following: ['Following1', 'Following2'],
  });

  const testings = profiles.filter(newUser  =>
    newUser.userID == props.profileID
  );

  /* Mapping the courses into a new array of JSX nodes as arrayDataItems */
  const arrayDataItems = testings.map(newUser => 
        <div className="profile-container">
          

          <div className="profile">
            <img src={newUser.profilePicture} alt="Profile Picture" className="profile-picture" />
            <h1 className="profile-name">{newUser.name}</h1>
            <p className="profile-bio">{newUser.bio}</p>

            {
              props.currentUserID == props.profileID
              ? 
            <div className='contactButtons'>
              <a href="/Chat">
                <button>Chat</button>
              </a>
            </div>
            :
            <a href="/src/pages/PrivateProfilePage/PrivateProfile" class="private-profile-button">
              <button>Promjeni postavke</button>
            </a>
            
            }
          </div>


          <div className="connections">
            <div className="followers">
              <h2>Followers</h2>
              {newUser.followers.map((follower, index) => (
                <p key={index}>{follower}</p>
              ))}
            </div>

            <div className="following">
              <h2>Following</h2>
              {newUser.following.map((followed, index) => (
                <p key={index}>{followed}</p>
              ))}
            </div>
          </div>

          <div className="posts">
            <h2>Recent Posts</h2>
            {newUser.posts.map((post, index) => (
              <div key={index} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p className="post-date">Date: {post.date}</p>
              </div>
            ))}
          </div>
        </div>

  )

  console.log(props);
  console.log(props);
  console.log(arrayDataItems);


  return (
    <div>
      {arrayDataItems}
    </div>
      
      
      );
    };

export default Profile;
