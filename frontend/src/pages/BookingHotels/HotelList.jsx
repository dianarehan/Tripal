import { useState, useEffect, useRef } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import FooterThree from "@/components/layout/footers/FooterThree";
import TouristHeader from "@/components/layout/header/TouristHeader";
import img3 from "../BookingHotels/Components/HotelsImages/hotel2.jpeg";
import img5 from "../BookingHotels/Components/HotelsImages/hotel8.jpeg";
import img1 from "../BookingHotels/Components/HotelsImages/hotel7.jpeg";
import img6 from "../BookingHotels/Components/HotelsImages/hotel3.jpeg";
import img2 from "../BookingHotels/Components/HotelsImages/hotel5.jpeg";
import img4 from "../BookingHotels/Components/HotelsImages/hotel4.jpeg";
import {
  getTouristCurrency,
  getConversionRate,
} from "@/api/ExchangeRatesService.js";

import { useParams } from "react-router-dom";

import { getHotels } from "../../api/HotelService.js";

export default function TourList1() {
  const [setDdActives] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropDownContainer = useRef();
  const { cityCode, dates1, dates2 } = useParams();
  const images = [img1, img2, img3, img4, img5, img6];
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currency, setCurrency] = useState("EGP");
  const getExchangeRate = async () => {
    if (currency) {
      const rate = await getConversionRate(currency);
      setExchangeRate(rate);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCurrency = getTouristCurrency();
      setCurrency(newCurrency);
      getExchangeRate();
    }, 1);
    return () => clearInterval(intervalId);
  }, [currency]);

  const fetchTourData = async () => {
    try {

      const response = await getHotels(cityCode);
      const transformedData = response.map((hotel, index) => ({
        id: hotel.hotelId,
        title: hotel.name,
        location: hotel.iataCode,
        description: "A beautiful hotel for a remarkable holiday.",
        // price: 10000,
        // fromPrice: 15000,
        features: [
          {
            icon: `icon-price-tag`,
            name: "Best Price Guarantee",
          },
          {
            icon: `icon-check`,
            name: "Free Cancellation",
          },
        ],
        imageSrc: images[index % images.length],
        duration: "1 night",
      }));

      setFilteredHotels(transformedData);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const filteredHotelList = filteredHotels.filter((hotel) =>
    hotel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTourData();
  }, [cityCode]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const metadata = {
    title: "Hotels || Tripal ",
  };

  return (
    <>
      <style>{`
  .search-container {
    margin: 20px 0;
    max-width: 400px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid var(--color-light-purple);
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-left: auto; /* This pushes it to the right */
  }

  .search-container:hover {
    border-color: var(--color-pink);
  }

  .search-container:focus-within {
    border-color: var(--color-stone);
    box-shadow: 0 2px 8px rgba(3, 98, 100, 0.1);
  }

  .search-icon {
    padding: 0 12px;
    color: var(--color-dark-purple);
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    height: 45px;
    padding: 0 12px;
    font-size: 15px;
    border: none;
    background: transparent;
    color: var(--color-dark-green);
  }

  .search-input:focus {
    outline: none;
  }

  .search-input::placeholder {
    color: var(--color-dark-purple);
    opacity: 0.6;
  }
`}</style>
      <MetaComponent meta={metadata} />
      <div className="page-wrapper">
        <TouristHeader />
        <main className="page-content">
          <section className="layout-pb-xl">
            <div className="search-container">
              <span className="search-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search for hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div
              className="container"
              style={{ placeItems: "center", marginRight: "10px" }}
            >
              <div className="col-xl-9 col-lg-8" style={{}}>
                <div className="row y-gap-30 pt-30">
                  {filteredHotelList.map((elm, i) => (
                    <div className="col-12" key={i}>
                      <div className="tourCard -type-2">
                        <div className="tourCard__image">
                          <img src={elm.imageSrc} alt="image" />

                          {elm.ho && (
                            <div className="tourCard__badge">
                              <div className="bg-accent-1 rounded-12 text-white lh-11 text-13 px-15 py-10">
                                {elm.id}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="tourCard__content">
                          <div
                            className="tourCard__location"
                            style={{ cursor: "default" }}
                          >
                            <i className="icon-pin"></i>
                            {elm.location}
                          </div>

                          <h3
                            className="tourCard__title mt-5"
                            style={{ cursor: "default" }}
                          >
                            <span>{elm.title}</span>
                          </h3>

                          <p
                            className="tourCard__text mt-5 "
                            style={{ cursor: "default" }}
                          >
                            {elm.description}
                          </p>

                          <div className="row x-gap-20 y-gap-5 pt-30">
                            {elm.features?.map((elm2, i2) => (
                              <div key={i2} className="col-auto">
                                <div
                                  className="text-14"
                                  style={{
                                    color: "var(--color-stone)",
                                    cursor: "default",
                                  }}
                                >
                                  <i className={`${elm2.icon} mr-10`}></i>
                                  {elm2.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="tourCard__info">
                          <div>
                            <div className="d-flex items-center text-14">
                              <i
                                className="icon-clock mr-10"
                                style={{ cursor: "default" }}
                              ></i>
                              {elm.duration}
                            </div>

                            <div
                              className="tourCard__price"
                              style={{ cursor: "default" }}
                            >
                              {/* <div>
                                {currency || "EGP"}{" "}
                                {(elm.fromPrice * exchangeRate).toFixed(2)}
                              </div> */}

                              {/* <div className="d-flex items-center">
                                From{" "}
                                <span
                                  className="text-20 fw-500 ml-5"
                                  style={{ cursor: "default" }}
                                >
                                  {currency || "EGP"}{" "}
                                  {(elm.price * exchangeRate).toFixed(2)}
                                </span>
                              </div> */}
                            </div>
                          </div>

                          <button
                            className="button -outline-accent-1 "
                            style={{ color: "var(--color-stone)" }}
                            onClick={() =>
                              (window.location.href = `/hotelDetails/${cityCode}/${elm.title}/${elm.id}/${dates1}/${dates2}`)
                            }
                          >
                              View Details
                            <i className="icon-arrow-top-right ml-10"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>{" "}
        </main>
        <FooterThree />
      </div>
    </>
  );
}
