import React, { useEffect, useState } from "react";
import { getRatings } from "../../../api/RatingService";
import Stars from "../../common/Stars"; 

const ItineraryReviews = ({ itineraryId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getRatings(itineraryId, "itinerary");
        console.log(data);
        const transformedReviews = data.ratings.map((rating) => ({
          // avatar: rating.userID.avatar, 
          name: rating.userID?.userName || "Unknown User",
          date: new Date(rating.createdAt).toLocaleDateString(),
          stars: rating.rating, 
          comment: rating.review || "No review text available", 
        }));
        setReviews(transformedReviews);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (itineraryId) {
      fetchReviews();
    }
  }, [itineraryId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {reviews.map((elm, i) => (
        <div key={i} className="pt-30">
          <div className="row justify-between">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="size-40 rounded-full">
                  {/* <img src={elm.avatar} alt="image" className="img-cover" /> */}
                </div>
                <div className="text-16 fw-500 ml-20">{elm.name}</div>
              </div>
            </div>
            <div className="col-auto">
              <div className="text-14 text-light-2">{elm.date}</div>
            </div>
          </div>

          <div className="d-flex items-center mt-15">
            <div className="d-flex x-gap-5">
              <Stars star={elm.stars} />
            </div>
            <div className="text-16 fw-500 ml-10">{elm.reviewText}</div>
          </div>

          <p className="mt-10">{elm.comment}</p>

          {/* <div className="row x-gap-20 y-gap-20 pt-20">
            {elm.images.map((imgSrc, i2) => (
              <div key={i2} className="col-auto">
                <div className="size-130">
                  <img src={imgSrc} alt="image" className="img-cover rounded-12" />
                </div>
              </div>
            ))}
          </div> */}

          {/* <div className="d-flex x-gap-30 items-center mt-20">
            <div>
              <a href="#" className="d-flex items-center">
                <i className="icon-like text-16 mr-10"></i>
                Helpful
              </a>
            </div>
            <div>
              <a href="#" className="d-flex items-center">
                <i className="icon-dislike text-16 mr-10"></i>
                Not helpful
              </a>
            </div>
          </div> */}
        </div>
      ))}
    </>
  );
};

export default ItineraryReviews;
