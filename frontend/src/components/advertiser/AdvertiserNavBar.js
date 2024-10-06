import React from "react";
import { Link } from "react-router-dom";

const AdvertiserNavBar = ({ advertiserId }) => {
  return (
    <nav>
      <div class="nav-bar">
        <div class="nav-bar-link">
          <Link to="/advertiser">Home</Link>
        </div>
        <div class="nav-bar-link">
          <Link to={`/advertiser/${advertiserId}`}>Profile</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/create-activity">Create Activity</Link>
        </div>
        <div class="nav-bar-link">
          <Link to={`/advertiser-activity/${advertiserId}`}>Activities</Link>
        </div>

      </div>
    </nav>
  );
};

export default AdvertiserNavBar;