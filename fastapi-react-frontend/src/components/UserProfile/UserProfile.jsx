import React, { useState, useEffect } from 'react';
import Auth from '../../services/auth'; // Adjust import as needed
import PrincipalService from '../../services/principal.service'; // Adjust import as needed
import { FaCircleUser } from "react-icons/fa6";
import "./UserProfile.css";

const UserProfile = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
    });

    const fetchUserProfile = async () => {
        try {
            const userProfile = await PrincipalService.identity();
            setUser(userProfile);
        } catch (err) {
            console.error('Failed to fetch user profile:', err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEditProfile = () => {
        // Implement edit profile functionality
        console.log('Edit profile button clicked');
    };

    return (
        <div className='user-profile-container'>
            <h1>User Profile</h1>
            <div className="user-profile">
                <div className="profile-image-container">
                    <FaCircleUser size="100" />
                </div>
                <form className="profile-details">
                    <div className="form-group">
                        <label>ID:</label>
                        <input type="text" value={user.id} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={user.name} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={user.email} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <input type="text" value={user.role} readOnly />
                    </div>
                    <button type="button" onClick={handleEditProfile} className="edit-button">Edit Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
