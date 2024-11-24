import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className="xl:d-none ml-30">
        <div className="desktopNav">
          <div className="desktopNav__item">
            <Link to="/tourguide">Home</Link>
          </div>

          <div className="desktopNav__item">
            <Link to="/destinations">My Itineraries</Link>
          </div>

          <div className="desktopNav__item">
            <Link to="/destinations">Create Itinerary</Link>
          </div>
        </div>
      </div>
    </>
  );
}