import React, { useState } from 'react';
import './PrivateProfile.css'; // You can create a separate CSS file for styling
import profilePictureTemp from "../images/img/user.jpeg";

const PrivateProfile = () => {
  // State for user settings
  const [settings, setSettings] = useState({
    profilePicture: profilePictureTemp,
    name: 'John Doe',
    email: 'john@example.com',
    availability: 'Anytime',
    receiveMessages: true,
    receiveNotifications: true,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setSettings({
      ...settings,
      [name]: newValue,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSettings({ ...settings, profilePicture: selectedImage });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to save settings (e.g., send to server)
    console.log('Settings submitted:', settings);
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
      <img src={settings.profilePicture} alt="Profile Picture" className="profile-picture" />
      <label htmlFor="profile_picture">Upload Image:</label>
        <input
          className='image_upload'
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={settings.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={settings.email}
          onChange={handleInputChange}
        />

        <label for="from">Availability:</label>

        <label>From: <input type="time" id="from" name="appt" min="09:00" max="18:00" required /></label>
        <label>To: <input type="time" id="to" name="appt" min="09:00" max="18:00" required /></label>

        <label>
          Receive Messages:
          <input
            className='checkboxSetting'
            type="checkbox"
            name="receiveMessages"
            checked={settings.receiveMessages}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Receive Notifications:
          <input
            className='checkboxSetting'
            type="checkbox"
            name="receiveNotifications"
            checked={settings.receiveNotifications}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default PrivateProfile;