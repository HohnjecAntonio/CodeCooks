import React from 'react';
import { useSelector } from 'react-redux';

const UserFeed = () => {
    const jwtToken = localStorage.getItem("token");

    return (
        <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-black">Welcome to Your User Feed!</h1>
            <p className="text-gray-600">Your JWT Token: {jwtToken}</p>
        </div>
    );
};

export default UserFeed;
