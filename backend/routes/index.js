const express = require('express');
const router = express.Router();

const routes = [
    './preferenceTagRoutes',
    './SellerRoutes',
    './TourGuideRoutes',
    './AdvertiserRoutes',
    './activityControllerRoutes',
    './TouristRoutes',
    './ProductRoutes',
];

routes.forEach(route => {
    router.use('/api', require(route));
});

module.exports = router;
