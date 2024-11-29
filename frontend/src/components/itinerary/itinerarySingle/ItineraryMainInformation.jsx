import Stars from "../../common/Stars";
import { message } from "antd";
import {bookmarkEvent} from "@/api/TouristService";

const handleShare = (link) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this itinerary!",
        url: link,
      })
      .catch((error) => {
        message.error("Failed to share");
      });
  } else {
    window.location.href = `mailto:?subject=Check out this itinerary!&body=Check out this link: ${link}`;
  }
};
const handleBookmark = async (eventId, eventType) => {
  try {
    const data = await bookmarkEvent(eventId, eventType);
    message.success("Added to Bookmarked Events")
  } catch (error) {
    console.error('Error bookmarking event:', error);
  }
};
const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');  
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); 
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};
export default function ItineraryMainInformation({ itinerary }) {
  return (
    <>
      <div className="row y-gap-20 justify-between items-end">
        <div className="col-auto">
          <div className="row x-gap-10 y-gap-10 items-center">
            <div className="col-auto">
              <button className="button -accent-1 text-14 py-5 px-15 bg-accent-1-05 text-accent-1 rounded-200">
                Bestseller
              </button>
            </div>
            <div className="col-auto">
              <button className="button -accent-1 text-14 py-5 px-15 bg-accent-1-05 text-accent-1 rounded-200">
                Free cancellation
              </button>
            </div>
          </div>

          <h2 className="text-40 sm:text-30 lh-14 mt-20">
            {itinerary?.title}{" "}
          </h2>
          <h3 className="text-20 sm:text-16 text-light-2 mt-10">
            {itinerary?.description}
          </h3>

          <div className="row x-gap-20 y-gap-20 items-center pt-20">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex x-gap-5 pr-10">
                  <Stars star={itinerary?.averageRating} font={12} />
                </div>
                {itinerary?.averageRating.toFixed(2)} (
                {itinerary.bookings.length})
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-pin text-16 mr-5"></i>
                {/* {itinerary?.locations[0].split(",")[0]} */}
              </div>
            </div>

            <div className="col-auto">
                <div className="d-flex items-center">
                <i className="icon-calendar mr-10"></i> 
                {formatDate(itinerary?.startDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="col-auto">                        
                                                             {/* this should be aala hasab el user role */}
          <div className="d-flex x-gap-30 y-gap-10">
            <a
              className="d-flex items-center"
              style={{ color: "grey" }}
              onClick={() =>
                handleShare(
                  `${window.location.origin}/itinerary/${itinerary._id}`
                )
              }
            >
              <i className="icon-share flex-center text-16 mr-10"></i>
              Share
            </a>

            <div
              className="d-flex items-center"
              style={{ color: "grey" }}
            >
              <i
                className="icon-heart flex-center text-16 mr-10"
                style={{ cursor: "pointer" }}
                onClick={() => handleBookmark(itinerary._id, "itinerary")}
              ></i>
              Add to Wishlist
            </div>
          </div>
        </div>
      </div>
    </>
  );
}