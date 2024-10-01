const express = require("express");
const router = express.Router();

const routes = [
  "./UserRoutes",
  "./PreferenceTagRoutes",
  "./SellerRoutes",
  "./TourGuideRoutes",
  "./AdvertiserRoutes",
  "./ActivityCategoryRoutes",
  "./TouristRoutes",
  "./ProductRoutes",
  "./ActivityRoutes",
];

routes.forEach((route) => {
  router.use("/api", require(route));
});

module.exports = router;
