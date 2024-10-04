import { Routes, Route } from "react-router-dom";
import adminRoutes from "./AdminRoutes";
import touristRoutes from "./TouristRoutes"
import productRoutes from "./ProductRoutes";
import generalRoutes from "./GeneralRoutes";

const allRoutes = [...adminRoutes, ...touristRoutes, ...productRoutes, ...generalRoutes];

const RoutesComponent = () => (
  <Routes>
    {allRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Routes>
);

export default RoutesComponent;