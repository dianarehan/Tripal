import React from "react";
import { Link } from "react-router-dom";
import { tourGuideID } from "../../IDs";
const TourguideNavBar = () => {
  return (
    <nav>
      <div class="nav-bar">
        <div class="nav-bar-link">
          <Link to="/tourguide/create">Create Profile</Link>
        </div>
        <div class="nav-bar-link">
          <Link to={`/tourguide/update/${tourGuideID}`}>Update Profile</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/tourguide">Home</Link>
        </div>
        <div class="nav-bar-link">
          <Link to={`/tourguide/${tourGuideID}`}>View profile</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/create-itinerary">New Itinerary</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/tourguide-itineraries">My Itineraries</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/">Log out</Link>
        </div>

      </div>
    </nav>
  );
};

export default TourguideNavBar;
