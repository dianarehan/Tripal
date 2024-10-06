import React from "react";
import { Link } from "react-router-dom";

const TourguideNavBar = () => {
  return (
    <nav>
      <div class="nav-bar">
        <div class="nav-bar-link">
          <Link to="/tourguide">Home</Link>
        </div>
        {/* <div class="nav-bar-link">
          <Link to="/tourguide">Profile</Link>
        </div> */}
        <div class="nav-bar-link">
          <Link to="/tourguide-itineraries">Itineraries</Link>
        </div>
      </div>
    </nav>
  );
};

export default TourguideNavBar;