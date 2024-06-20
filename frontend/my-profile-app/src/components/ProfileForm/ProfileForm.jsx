import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    photo: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/profile", profile)
      .then((response) => console.log("Profile saved:", response))
      .catch((error) => console.error("Error saving profile:", error));
  };

  const handleReset = () => {
    setProfile({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      photo: "",
    });
  };

  return (
    <div className="profile-form">
      <div className="profile-content">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        <div className="upload-photo">
          <label htmlFor="photo-upload" className="file-label">
            <img
              src="https://www.freepnglogos.com/uploads/camera-logo-png/camera-icon-thin-line-transparent-21.png"
              alt=""
              className="camera-icon"
            />
            Add a profile photo
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>
          {profile.photo && (
            <img src={profile.photo} alt="Profile" className="profile-photo" />
          )}
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="name-group">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="input-field input-full-width"
              placeholder="jane@acme.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="input-field input-full-width textarea"
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="btn reset-button"
            >
              Reset
            </button>
            <button type="submit" className="btn save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
