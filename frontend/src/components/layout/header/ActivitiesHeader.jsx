import { Link } from 'react-router-dom';
import HeaderSearch from "./HeaderSearch";

export default function PageHeader({onSearch, title, tourist, admin}) {
  return (
    <section className="pageHeader -type-3">
      <div className="container">
        <div className="row justify-between">
          <div className="col-auto">
            <div className="breadcrumbs">
              <span className="breadcrumbs__item">
                {admin && <Link to="/admin">Home</Link> }
                {tourist&& <Link to="/tourist">Home</Link> }
                {!admin && !tourist && <Link to="/">Home</Link> }                
              </span>

              <span>{" > "}</span>
              <span className="breadcrumbs__item">
                {admin &&<Link to="/admin/activities">Activities</Link> }
                {tourist && <Link to="/upcoming-activities">Activities</Link> }
                {!admin && !tourist && <Link to="/upcomingactivities">Activities</Link> }                
              </span>
            </div>
          </div>

          <div className="col-auto">
            <div className="pageHeader__subtitle">
              <HeaderSearch onSearch={onSearch} activity={true}/>
            </div>
          </div>
        </div>

        <div className="row pt-30">
          <div className="col-auto">
            <h1 className="pageHeader__title">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}