import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { message, Tour } from "antd";
import FooterThree from "@/components/layout/footers/FooterThree";
import Header1 from "@/components/layout/header/TouristHeader";
import PageHeader from "@/components/layout/header/SingleItineraryHeader";
import TourGuideHeader from "@/components/layout/header/TourGuideHeader";
import GuestHeader from "@/components/layout/header/GuestHeader";
import { getItineraryById } from "@/api/ItineraryService";
import ItineraryDetails from "@/components/itinerary/itinerarySingle/ItineraryDetails";
import { getUserData } from "@/api/UserService";
import Sidebar from "@/components/dasboard/Sidebar";
import Header from "@/components/dasboard/Header";
import MetaComponent from "@/components/common/MetaComponent";
import NotFoundPage from "@/pages/pages/404";
import Spinner from "@/components/common/Spinner";
import Index from './index'

const ItineraryDetailsPage = () => {
  //#region 1. Variables
  const location = useLocation();
  const navigate = useNavigate();
  const { itineraryId } = useParams();
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const refItineraryBook = useRef(null);
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: "Book Itinerary",
      description: "Another step towards a great time.",
      target: () => refItineraryBook.current,
      onFinish: () => {
        setOpen(false); 
        localStorage.setItem('currentStep', 5); 
        navigate("/tourist", { state: { fromTour: true, targetStep: 5 } });
      },
    },
  ]

  //#endregion

  //#region 2. useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response.data.status === "success") {
          setUserRole(response.data.role);
        } else {
          setUserRole("Guest");
        }
      } catch (error) {
        message.error("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getItineraryById(itineraryId);
        setItinerary(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching activities");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    const isFromTour = location.state?.fromTour;

    if ( isFromTour && refItineraryBook.current) {
      refItineraryBook.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  useEffect(() => {
    const isFromTour = location.state?.fromTour;
  
    const timer = setTimeout(() => {
      if (isFromTour) {
        setOpen(true); 
      }
    }, 1200); 
  
    return () => clearTimeout(timer); 
  }, [location]);

  //#endregion
  
  if (loading) return <div><Spinner/></div>;
  if (error) return <div><NotFoundPage/></div>;
  if (!itinerary) return <div><Index/></div>;

  const metadata = {
    title: `${itinerary.title} Details | Tripal Travel`,
    description: "Itinerary Details || Tripal Travel",
  };
  return (
    <>
      <MetaComponent meta={metadata} />
      <style jsx global>{`
        /* Base style for all dots */
        /* Try multiple selectors and approaches */
        .ant-tour .ant-tour-indicators > span {
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background: #dac4d0 !important;
        }
        .ant-tour .ant-tour-indicators > span[class*="active"] {
          background: #036264 !important;
        }

        /* Additional specificity */
        .ant-tour-indicators span[role="dot"][aria-current="true"] {
          background: #036264 !important;
        }

        .ant-tour .ant-tour-inner {
          border: 1px solid #5a9ea0;
          box-shadow: 0 4px 12px rgba(3, 98, 100, 0.15);
        }

        .ant-tour .ant-tour-content {
          color: #8f5774;
          font-weight: 500 !important;
          letter-spacing: 0.3px !important;
          text-rendering: optimizeLegibility !important;
        }

        .ant-tour .ant-tour-title {
          color: #5a9ea0;
          font-weight: 600;
        }

        .ant-tour .ant-tour-close {
          color: #5a9ea0;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .ant-tour .ant-tour-close:hover {
          opacity: 1;
          color: #e5f8f8;
        }

        .ant-tour .ant-tour-buttons .ant-btn {
          transition: all 0.3s ease;
        }

        .ant-tour .ant-tour-buttons .ant-btn-primary
        {
          background: #036264;
          border: none;
          color: white;
          transition: all 0.2s;
        }
        .ant-tour .ant-tour-buttons .ant-btn-default{
          background: #036264;
          border: none;
          color: white;
          transition: all 0.2s;
        }
        
        .ant-tour .ant-tour-buttons .ant-btn-primary:hover,
        .ant-tour .ant-tour-buttons .ant-btn-default:hover {
          color:white;
          background: #5a9ea0;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(3, 98, 100, 0.2);
        }
        .ant-tour .ant-tour-arrow-content {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }  
      `}</style>
      <main>
        {userRole === "Guest" && 
          <>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
            <GuestHeader /> 
            <PageHeader itineraryId={itineraryId} itineraryTitle={itinerary.title} />
            <ItineraryDetails 
              itinerary={itinerary} 
              userRole={userRole} 
              refItineraryBook={refItineraryBook} 
            />
            <FooterThree />
          </>
        }

        {userRole === "Admin" && (
          <div
            className={`dashboard ${
              sideBarOpen ? "-is-sidebar-visible" : ""
            } js-dashboard`}
          >
            <Sidebar setSideBarOpen={setSideBarOpen} />
            <div className="dashboard__content">
              <Header setSideBarOpen={setSideBarOpen} />
              <PageHeader itineraryId={itineraryId} itineraryTitle={itinerary.title} admin={"ana admin"} />
              <ItineraryDetails itinerary={itinerary} userRole={userRole} />
              <div className="text-center pt-30">
                © Copyright Tripal {new Date().getFullYear()}
              </div>
            </div>
          </div>
        )}

        {userRole === "Tourist" && (
          <>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
            <Header1 />
            <PageHeader itineraryId={itineraryId} itineraryTitle={itinerary.title}  tourist={"ana tourist"}/>
            <ItineraryDetails 
              itinerary={itinerary} 
              userRole={userRole}
              refItineraryBook={refItineraryBook} 
            />
            <FooterThree />
          </>
        )}

        {userRole === "Tour Guide" && (
          <>
            <TourGuideHeader />
            <PageHeader itineraryId={itineraryId} itineraryTitle={itinerary.title}  tourguide={"ana tourguide"}/>
            <ItineraryDetails itinerary={itinerary} userRole={userRole} />
            <FooterThree />
          </>
        )}
      </main>
    </>
  );
};

export default ItineraryDetailsPage;