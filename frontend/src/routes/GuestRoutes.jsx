import HomePage5 from "@/pages/homes/home-5";
import ActivityDetailsPage from "../pages/tourist/ActivityDetails";
import ItineraryDetailsPage from "../pages/tourist/ItineraryDetails";
import LoginPage from "@/pages/pages/login";
import Activities from "../pages/commonPagesForMultipleUsers/Activities";
import HistoricalPlaces from "../pages/commonPagesForMultipleUsers/HistoricalPlaces";
import HistoricalPlacesDetails from "../pages/commonPagesForMultipleUsers/HistoricalPlacesDetails";
import ResetPassword from "@/pages/pages/login/ResetPassword";
import Itineraries from "../pages/commonPagesForMultipleUsers/Itineraries";
import PendingPage from "@/pages/commonPagesForMultipleUsers/PendingRequest";
import RegisterPage from "../pages/pages/register";
import TourList1 from "../pages/BookingHotels/HotelList";

const guestRoutes = [
  { path: "/", element: <HomePage5 /> },
  { path: "/login", element: <LoginPage /> },
  {path: "/guest/hotelList/:cityCode/:dates1/:dates2",element: <TourList1 />,},
  { path: "/activities/:activityId", element: <ActivityDetailsPage /> },
  { path: "/upcomingactivities", element: <Activities /> },
  { path: "/historicalPlaces", element: <HistoricalPlaces /> },
  { path: "/historical-places/:id", element: <HistoricalPlacesDetails /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/itineraries/:itineraryId", element: <ItineraryDetailsPage /> },
  { path: "/upcomingitineraries", element: <Itineraries /> },
  { path: "/pendingRequest", element: <PendingPage /> },
  { path: "/register", element: <RegisterPage /> },
];

export default guestRoutes;