import React from "react";
import { useLocation } from "react-router-dom";

const PendingPage = () => {
    const location = useLocation();
    return (
        <div className="pending-page-container">
            <h1>Your request is currently being processed, Wait for a notification</h1>
            <p>User Name: {location.state.userName}</p>
            <p>Email: {location.state.email}</p>
            <p>Role: {location.state.role}</p>
        </div>
    );
};

export default PendingPage;
