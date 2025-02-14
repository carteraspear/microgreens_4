import React, { useState } from "react";
import "./Profile.css"; // Import CSS for styling

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [bio, setBio] = useState("This is my bio.");
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150" // Default profile picture
  );

  // Handle edit/save button click
  const handleEditSaveClick = () => {
    if (isEditing) {
      // Save the changes (you can add an API call here to save the data)
      console.log("Profile saved:", { username, bio, profilePicture });
    }
    setIsEditing(!isEditing);
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-picture-container">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          {isEditing && (
            <label htmlFor="profile-picture-input" className="change-picture-button">
              Change Picture
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePictureChange}
              />
            </label>
          )}
        </div>

        {/* Username */}
        <div className="profile-field">
          <label>Username</label>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <div className="profile-info">{username}</div>
          )}
        </div>

        {/* Bio */}
        <div className="profile-field">
          <label>Bio</label>
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <div className="profile-info">{bio}</div>
          )}
        </div>

        {/* Edit/Save Button */}
        <button className="edit-save-button" onClick={handleEditSaveClick}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;