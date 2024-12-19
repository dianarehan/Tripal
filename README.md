<img width="172" alt="Untitled" src="https://github.com/user-attachments/assets/9b10e286-925b-456a-9ddf-9d573269c2a6" />


--------
## Motivation  
Traveling is about creating unforgettable memories, exploring new destinations, and experiencing diverse cultures. However, planning a trip can often be overwhelming and time-consuming.  
**Tripal** was created to simplify the travel experience by providing tourists with a comprehensive platform to:  
- **Book activities and itineraries** tailored to their preferences.  
- **Explore historical places** with detailed insights and recommendations.  
- **Shop for unique products and souvenirs** directly from the app.
  
Our mission is to empower travelers with a seamless, enjoyable, and enriched journey, transforming how they explore the world.  

## Frameworks/Libraries used
[![MongoDB][MongoDB]][MongoDB-url]
[![Express.js][Express.js]][Express-url]
[![React][React.js]][React-url]
[![Node.js][Node.js]][Node-url]
[![npm][npm]][npm-url]
[![Nodemailer][Nodemailer]][Nodemailer-url]
[![Mongoose][Mongoose]][Mongoose-url]
[![JSON Web Token][jsonwebtoken]][jsonwebtoken-url]
[![React Router][ReactRouter]][ReactRouter-url]
[![MUI][MUI]][MUI-url]
[![Firebase Storage][FirebaseStorage]][FirebaseStorage-url]
[![Bcrypt][Bcrypt]][Bcrypt-url]
[![Ant Design][AntDesign]][AntDesign-url]
[![Node Cron][NodeCron]][NodeCron-url]
[![ESLint][ESLint]][ESLint-url]
[![Prettier][Prettier]][Prettier-url]

## Build Status
- This project is actively under development and is built and tested locally.
- No automated CI/CD tests are currently configured.
- Additional documentation and automation workflows should be added in the future.
## Setup the project locally:
### 1. Make Sure to Have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) Installed

To verify that Node.js and npm are installed correctly, run the following commands:
```bash
node -v
npm -v
```

### 2. Clone the repository
```
git clone https://github.com/dianarehan/Tripal.git
```
### 3. Navigate to project directory after cloning
```
cd Tripal
```
### 4. Install all dependencies
```
npm install
cd backend
npm install
cd ..
cd frontend
npm install
cd ..
```

## How to use 
After installing all dependencies:
1. Add .env to the backend directory with the following format and replace the variables values with your own
```
NODE_ENV = development
PORT = 5050
MONGO_URI =
JWT_SECRET =
CLOUD_NAME = 
CLOUD_KEY =
CLOUD_KEY_SECRET =
AMADEUS_CLIENT_ID =
AMADEUS_CLIENT_SECRET =
clientId=
clientSecret=
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
FRONTEND_URL=
EMAIL_USER=
EMAIL_PASS=
```
2. To start the application
    ```npm start```

## Key features
* **User Management:** secure sign up and login for tourist, tour guide, seller and advertiser
* **Activities and Bookings:** Create, manage, and book activities, events, and itineraries with search and filter options for tourists.
* **Hotels and flights:** tourist can book hotels, flights and transportation.
* **Product Management:** Sellers can add, edit, and manage products. Tourists can browse, filter, and purchase products.
* **Payments & Cancellations:** Tourists can book and pay for events and activities, with options for cancellations and loyalty points.
* **Reviews & Ratings:** Users can rate and review activities, itineraries, products, and tour guides.
* **Admin Controls:** Admins can manage users, approve profiles, handle complaints, and access reports.
* **Notifications:** Users receive notifications for bookings, promotions, and important updates.
  
## Screenshots 
<details> <summary>📋 General Pages</summary>
Login Page
<img width="1440" alt="Login Page" src="https://github.com/user-attachments/assets/4ec3d584-aedf-415a-91fc-93af0f3dce22" />
Registration Page
<img width="1440" alt="Registration Page" src="https://github.com/user-attachments/assets/b6ade371-a23d-466d-a689-c6c86cd47a7c" /> </details> <details> <summary>🌍 Tourist Pages</summary>
Flight Booking Page
<img width="1440" alt="Flight Booking Page" src="https://github.com/user-attachments/assets/2b438591-b1b4-4efe-bc71-d4332cda8b2e" />
Complaints Details Page
<img width="1440" alt="Complaints Details Page" src="https://github.com/user-attachments/assets/d733d275-fd81-483a-a8fe-e7480d48bc05" />
Tourist Home Page
<img width="1440" alt="Tourist Home Page" src="https://github.com/user-attachments/assets/e9652328-700c-4ca4-a635-003b387038b2" />
Products Page
<img width="1440" alt="Products Page" src="https://github.com/user-attachments/assets/71d77c33-7771-485f-a7e3-e124f10dc07e" />
Historical Places Page
<img width="1440" alt="Historical Places Page" src="https://github.com/user-attachments/assets/0fe66f5d-6e11-4dc5-9bc8-a533c7d6eb4c" />
Orders Page
<img width="1440" alt="Orders Page" src="https://github.com/user-attachments/assets/c88519cc-8779-4b7d-b409-1ac703788f99" />
Adding to Cart Page
<img width="1440" alt="Adding to Cart Page" src="https://github.com/user-attachments/assets/687d89e0-305f-477b-bd96-5a111cb85ea4" /> </details> <details> <summary>📢 Advertiser Pages</summary>
Create Activity Page
<img width="1440" alt="Create Activity Page" src="https://github.com/user-attachments/assets/666dfe25-8321-45c6-83d6-f681f05c9a58" /> </details> <details> <summary>📋 Admin Pages</summary>
Admin Dashboard
<img width="1440" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/22013562-2951-4b10-9773-dda466b4e403" />
Managing User Requests
<img width="1440" alt="Managing User Requests" src="https://github.com/user-attachments/assets/63eeaccd-9071-44f1-bc2b-47d2ddc87ba4" />
Viewing Activities
<img width="1440" alt="Viewing Activities" src="https://github.com/user-attachments/assets/da8083ff-50e5-4a73-9fd7-473d583c7867" />
Managing Preferred Tags
<img width="1440" alt="Managing Preferred Tags" src="https://github.com/user-attachments/assets/0c367d1b-d133-4ef9-bd26-383a25827214" />
Complaints Management
<img width="1440" alt="Complaints Management" src="https://github.com/user-attachments/assets/d9caa99f-09e8-4964-ba2e-6f4eb8f3f54f" /> </details>


## App Features

<details>
 <summary>Guest</summary>
 
- Register as a tourist or tour guide/advertiser/seller
- View, filter, and sort upcoming activities/itineraries by various criteria (price, ratings, date, etc.)

</details>

<details>
 <summary>Tourist</summary>
 
- View, filter, sort & search through upcoming events/historical places by various criteria (price, ratings, date, etc.)
- Bookmark events so that I can view them later
- Book tickets for events/activities/itineraries/flights/hotels/transportation 
- View my history of bookings for events/flights/hotels that are upcoming or I have already attended
- Cancel bookings
- Rate & comment on tour guides, products I bought & events that I attended
- Receive loyalty points & badges
- Redeem points for cash in wallet
- File complaints & view their status
- View, filter, sort, and search through all available products 
- Add products to my wishlist or cart & view/update them 
- Pay online for events using a card/from wallet
- Receive notifications for upcoming events & bookings via email/on the website
- View current and past orders with their details
- Use promo codes during bookings
- Share activities/places/products links
- Change the currency I want to view prices in
- View a step-by-step vacation booking guide

</details>

<details>
 <summary>Tour Guide</summary>
 
- Create, read, update & delete itineraries with detailed information
- Activate/deactivate itineraries with bookings
- View & filter sales reports containing all my revenue/ reports of the number of tourists that attended my events
- Receive notifications when an itinerary of mine is flagged as inappropriate via email/on the system

</details>

<details>
 <summary>Advertiser</summary>
 
- Create, read, update & delete activities
- View & filter sales reports containing all my revenue/ reports of the number of tourists that attended my events
- Receive notifications when an activity of mine is flagged as inappropriate via email/on the system

</details>

<details>
 <summary>Seller</summary>
 
- Create, read, update & delete product listings
- View, filter, sort and search through available products with their details 
- View & filter sales reports of products
- Receive notifications for out-of-stock products on the system/via email
- Archive/unarchive a product

</details>

<details>
 <summary>Admin</summary>
 
- Manage user accounts (delete, add admins, add tourism governor, view uploaded documents, accept/reject registrations)
- Create, read, update & delete activity categories & preference tags
- View, filter, sort, search through lists of all events, historical places & products listed on the system
- Flag an event deemed inappropriate
- Archive/unarchive a product
- View, sort, filter through & manage complaints
- View & filter sales reports 
- View user statistics per month
- Create promo codes

</details>

<details>
 <summary>Tourism Governor</summary>
 
- Create, read, update & delete historical places
- Create tags for historical locations

</details>

<details>
 <summary>General Features</summary>
 
- Create & update profile 
- Login and password recovery via OTP
- Change password
- Upload pictures and documents
- Notifications for various events
- Accept the terms and conditions if accepted on the system
- Delete my account off the system 

</details>

## Code Examples
<details>
  <summary>BE Order Model Example</summary>
  <pre><code>
const orderSchema = new Schema(
  {
    touristId: {
      type: Schema.Types.ObjectId,
      ref: "Tourist",
      required: [true, "Tourist is required"],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Wallet", "Credit Card", "Cash on Delivery"],
      default: "Wallet",
      required: true,
    },
  },
  { timestamps: true }
);
  </code></pre>
</details>

<details>
  <summary>BE Get Tourist Orders Controller Example</summary>
  <pre><code>
const getOrders = asyncHandler(async (req, res) => {
  const touristId = req.userId;
  try {
    const orders = await Order.find({ touristId });

    if (!orders || orders.length === 0) {
      res.status(200).json([]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders. Please try again later." });
  }
});
  </code></pre>
</details>

<details>
  <summary>BE Common Users Routes Example</summary>
  <pre><code>
const express = require("express");
const router = express.Router();
const {
  loginUser,
  getUserData,
  logoutUser,
} = require("../controllers/UserController");

router.post("/login", loginUser);
router.get("/user-data", getUserData);
router.post("/logout", logoutUser);

module.exports = router;
  </code></pre>
</details>

<details>
  <summary>FE Create Complaint Service Example</summary>
  <pre><code>
export async function createComplaint(newComplaint) {
  try {
    const response = await axios.post(`/complaint`, newComplaint);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred while creating the complaint.");
  }
}
  </code></pre>
</details>

<details>
  <summary>FE Guest Routes Example</summary>
  <pre><code>
const guestRoutes = [
  { path: "/", element: <HomePage5 /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/activities/:activityId", element: <ActivityDetailsPage /> },
  { path: "/upcomingactivities", element: <Activities /> },
  { path: "/historicalPlaces", element: <HistoricalPlaces  /> },
  { path: "/historical-places/:id", element: <HistoricalPlacesDetails /> },
  { path:"/reset-password", element:<ResetPassword/>},
  { path: "/itineraries/:itineraryId", element: <ItineraryDetailsPage /> },
  {path : "/upcomingitineraries", element: <Itineraries/>},
];
  </code></pre>
</details>

<details>
  <summary>FE Seller Home Page Example</summary>
  <pre><code>
import SellerHeader from "../../components/layout/header/SellerHeader";
import FooterThree from "@/components/layout/footers/FooterThree";
import ProductRevenue from "../seller/Revenue"
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || Tripal",
};

const SellerHome = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="page-wrapper">
        <SellerHeader />
        <main className="page-content">
          <ProductRevenue />
          <div className="admin-content-details"></div>
        </main>
        <FooterThree />
      </div>
    </>
  );
};

export default SellerHome;
  </code></pre>
</details>
 

##  API References
<details>
 <summary>Advertiser</summary>

#### 1. View Advertiser  
**Get** `/advertiser`  Views advertiser profile.  

#### 2. Update Advertiser  
**Put** `/advertiser`  Updates advertiser profile.  

#### 3. Update Advertiser Password
**Put** `/advertiser-change-pass`  Updates advertiser password.  

#### 4. View Advertiser Notifications
**Get** `/advertiser/notificationList`  Views advertiser notifications. 

#### 5. Update Advertiser Notifications 
**Patch** `/advertiser/markNotifications`  Marks notifications as read. 

</details>

<details>
 <summary>Activities</summary>

#### 1. Get Tourist Activities
**Get** `/booked-activities`  Views booked tourist activities.  

#### 2. Get Advertiser Activities
**Get** `/activities/advertiser` Views activities made by a certain advertiser.  

#### 3. Get Activity By Id
**Get** `/activity/:id` Views a certain activity.  

#### 4. Create Activity
**Post** `/activities` Creates a new activity. 

#### 5. Update Activity  
**Put** `/activities/:id`  Updates an activity. 

#### 6. Delete Activity  
**Delete** `/activities/:id`  Deletes an activity. 

#### 7. View Upcoming Activities  
**Get** `/activities/upcoming`  Views all upcoming activities. 

#### 8. Add Rating
**Post** `/activities/:id/ratings`  Post activity rating. 

#### 9. Get Ratings
**Get** `/activities/:id/ratings`  Get activity ratings. 

#### 10. Get Revenue
**Get** `/activities/revenue`  Gets total Revenue made by advertiser.

</details>

<details>
 <summary>Activity Category</summary>

#### 1.Create Activity Category
**Post** `/activityCategory`  

#### 2. Get Activity Categories
**Get** `/activityCategories`  

#### 3.Delete Activity Category
**Delete** `/activityCategory/:id`  

#### 4. Update Activity Category
**Put** `/activityCategory/:id` 

</details>

<details>
 <summary>Admin</summary>

#### 1.Delete User
**Delete** `/admin/user/:role/:userId`  

#### 2. Add Admin
**Post** `/admin/addAdmin`  

#### 3.Get All Users
**Get** `/admin/users`  

#### 4. Change Password
**Patch** `/admin-change-pass` Updates admin password

#### 5. Admin Flag Itinerary
**Put** `/admin/flag-itinerary/:itineraryId` Admin flags itinerary as inappropriate.

#### 6. Admin Flag Activity
**Patch** `/admin/flag-activity/:activityId` Admin flags activity as inappropriate.

#### 7. Get All Itineraries 
**Get** `/admin/itineraries` Get all itineraries for admin.

#### 8. Get All Activities 
**Get** `/admin/activities` Get all activities for admin.

#### 9. Create PromoCode
**Post** `/admin/promocode` 

#### 10. Get PromoCodes
**Get** `/admin/promocode` 

#### 11. Get Data For Event Owner
**Get** `/admin/getDataForEventOwner/:userId` Get username and email for event owner to send an email on flagging event.

#### 12. Get Total Users Count
**Get** `/admin/getTotalUsers` 

</details>

<details>
 <summary>Bookings</summary>

#### 1. Book Resource
**Post** `/:resourceType/:resourceId/book`  Book activity or itineray using tourist's wallet.

#### 2. Cancel Resource
**Post** `/:resourceType/:resourceId/cancel`  Cancel booking.

#### 3. Complete Booking
**Post** `/:resourceType/:resourceId/complete-booking`  Book activity or itineray using credit card (stripe)

</details>

<details>
 <summary>Complaints</summary>

#### 1. Create Complaint
**Post** `/complaint`  Tourist posts a complaint to the admin.

#### 2. Get Complaints By Tourist
**Get** `/complaints/tourist`  View all complaints for a certain tourist.

#### 3. Get All Complaints
**Get** `/complaints`  View all complaints for admin.

#### 4. Get Complaint By Id
**Get** `/complaints/:id`  View a certain complaint.

#### 5. Update Complaint Status
**Put** `/complaint/status/:id`  Admin update complaint status as pending out resolved.

#### 6. Reply To Complaint
**Put** `/complaint/reply/:id`  Admin or tourist reply to complaint.

</details>

<details>
 <summary>Flights</summary>

#### 1. Get Flights
**Get** `/flightSearch`  Search for flights.

#### 2. Get City Code
**Get** `/flightCity`  Seach for city code.

</details>

<details>
 <summary>Historical Places</summary>

#### 1. Get Tourism Governer Historical Places
**Get** `/historicalPlaces/tourismGoverner`  Get historical places of a certain governer.

#### 2. Get All Historical Places
**Get** `/historicalPlaces/`  

#### 3. Create Historical Place
**Post** `/historicalPlaces/`  

#### 4. Update Historical Place
**Put** `/historicalPlaces/:id` 

#### 5. Get Historical Place
**Get** `/historicalPlaces/:id` Get a certain historical place.

#### 6. Delete Historical Place
**Delete** `/historicalPlaces/:id` Delete a certain historical place.

</details>

<details>
 <summary>Historical Tags</summary>

#### 1. Create Type Tags
**Post** `/typetags`  Create tag for the type historical place.

#### 2. Create Period Tags
**Post** `/periodtags`  Create tag for historical period of the historical place.

#### 3. Get Historical Type Tags
**Get** `/typetags`  Get tags for the type.

#### 4. Get Historical Period Tags
**Get** `/periodtags` Get tags for the period.

#### 5. Get Historical Type Tag By Id
**Get** `/typetags/:id` 

#### 6. Get Historical Period Tag By Id
**Get** `/periodtags/id` 

</details>

<details>
 <summary>Hotel Booking</summary>

#### 1. Search Hotels
**Get** `/searchHotels`  Search for hotels.

#### 2. Get Hotel Prices
**Get** `/getHotelPrices`  View prices of a certain hotel.

#### 3. Search City Code
**Get** `/searchCity`  Gets city code.

#### 4. Save Booking
**Post** `/saveBooking`  

</details>

<details>
 <summary>Itineraries</summary>

#### 1. Get Itinerary By Id
**Get** `/itinerary/:id`  

#### 2. Get Tourguide Bookings
**Get** `/my-itineraries-bookings`  To get revenue for each tourguide.

#### 3. Create Itinerary
**Post** `/create-itinerary`  

#### 4. Get Itineraries For Tourguide
**Get** `/my-itineraries`   Get itineraries for a certain tourguide.

#### 5. Update Itinerary
**Put** `/itinerary/:id`

#### 6. Delete Itinerary
**Delete** `/itinerary/:id`

#### 7. view Upcoming Itineraries
**Get** `/itinerary/upcoming/view`  

#### 8. Get Tourist Itineraries
**Get** `/itineraries/booked-itineraries`  

#### 9. Add Rating
**Post** `/itinerary/:id/ratings`  

#### 10. Get Rating
**Get** `/itinerary/:id/ratings` 

#### 11. Get All Itineraries For Admin
**Get** `/itinerary`

#### 12. Toggle Itinerary Status
**Patch** `/itinerary/:id/status`

#### 12. Revenue
**Get** `/itineraries/revenue`  Gets revenue for each tour guide.
</details>

<details>
 <summary>Orders</summary>

#### 1. Create Order
**Post** `/tourist/order` 

#### 2. Cancel Order
**Delete** `/tourist/order/:id`  

#### 3. Cancel Order
**Patch** `/tourist/order/:id/cancel`

#### 4. Get order by ID
**Get** `/order/:id`

#### 5. Pay order via stripe 
**post** `/tourist/stripe/payment`

#### 6. Get tourist orders
**Get** `/tourist/order`

</details>

<details>
 <summary>OTP</summary>

#### 1. Request Otp
**Post** `/request-otp` 

#### 2. Validate Otp
**Post** `/validate-otp`  

#### 2. Reset Password
**Post** `/reset-password` 

</details>

<details>
 <summary>Preference Tags</summary>

#### 1. Get Preference Tags
**Get** `/pref-tags` 

#### 2. Create Preference Tags
**Post** `/pref-tags`  

#### 3. Update Preference Tags
**Put** `/pref-tags/:id` 

#### 4. Delete Preference Tags
**Delete** `/pref-tags/:id` 

</details>

<details>
 <summary>Products</summary>

#### 1. Create Product
**Post** `/products` 

#### 2. Get Products
**Get** `/products`  

#### 3. Search Products By Name
**Get** `/products/search` 

#### 4. Filter Products By Price
**Get** `/products/filter` 

#### 5. Sort Products By Ratings
**Get** `/products/sort` 

#### 6. Edit Product
**Patch** `/products/:id` 

#### 7. Add Rating
**Post** `/products/:id/ratings`

#### 8. Get Ratings
**Get** `/products/:id/ratings`

#### 9. Archive Product
**Patch** `/products/:id/archive`

#### 10. Unarchive Product
**Patch** `/products/:id/unarchive`

#### 11. Unarchive Product
**Get** `/products/:id/isArchived`

#### 12. Revenue
**Get** `/products/revenue`

#### 13. Get Product Images
**Get** `/products/images`
#### 14. Get product by its ID
**Get** `/product/:id`


</details>

<details>
 <summary>Request to Make Account</summary>

#### 1. Create Request
**Post** `/request`  Request to create an account (adveriser, seller, tour guide, etc..)

#### 2. Get Requests
**Get** `/request`  Admin view all requests

#### 3. Get Request By Id
**Get** `/request/:id` 

#### 4. Delete Request
**Delete** `/request/:id` 

#### 4. Set Request State
**Delete** `/request/:id` 

#### 5. Update Request
**Put** `/requestDocument/:id` 

#### 6. Request Account Deletion
**Delete** `/request-deletion`   Request to delete my account

</details>

<details>
 <summary>Seller</summary>
 
#### 1. Create Seller
**Post** `/seller` 

#### 2. Update Seller Data
**Put** `/seller` 

#### 3. Read Seller Data
**Get** `/seller` 

#### 4. Change Password
**Put** `/seller-change-pass` 

#### 5. Mark Notification Seller
**Patch** `/seller/markNotifications` 

#### 6. Get Notification Seller
**Get** `/seller/notificationList` 

</details>

<details>
 <summary>TourGuide</summary>
 
#### 1. Create TourGuide
**Post** `/tourGuide` 

#### 2. update Tourguide Data
**Patch** `/tourGuide` 

#### 3. Mark Notification Read
**Patch** `/tourGuide/markNotifications` 

#### 4. Update Tourguide Data
**Patch** `/tourGuide` 

#### 5. get Tourguide Notifications
**Get** `/tourGuide/notificationList` 

#### 6. delete Tourguide Notification
**Delete** `/tourGuide/deleteNotificationList/:id` 

#### 7. get Tourguide Info
**Get** `/tourGuide` 

#### 8. Add Rating
**Post** `/tourGuide/:id/ratings` 

#### 9. Get Rating
**Get** `/tourGuide/:id/ratings` 

#### 10. Change Password
**Get** `/tourGuide-change-pass` 

</details>

<details>
 <summary>Tourism Governer</summary>
 
#### 1. addTourismGovernor
**Post** `/governor` 

#### 2. getTourismGovernors
**Get** `/governor` 

#### 3. Read Seller Data
**Put** `/seller` 

</details>

<details>
 <summary>Tourist</summary>
 
#### 1. Create Tourist
**Post** `/createTourist`

#### 2. Update Tourist Profile
**Put** `/updateTourist`

#### 3. Get Tourist Info
**Get** `/getTouristInfo`

#### 4. Redeem Points
**Post** `/redeem`

#### 5. Change Password
**Put** `/tourist-change-pass`

#### 6. Get Tourist Name and Email
**Get** `/tourist-name-email`

#### 7. Get Booked Flights
**Get** `/tourist/flights`

#### 8. Get Tourist Age
**Get** `/tourist/age`

#### 9. Get Booked Hotels
**Get** `/tourist/bookedHotels`

#### 10. Get Tourist Preferences
**Get** `/tourist/preferences`

#### 11. Get Tourist Categories
**Get** `/tourist/categories`

#### 12. Check if User Exists
**Get** `/tourist/exists`

#### 13. Bookmark Event
**Post** `/tourist/bookmark`

#### 14. Get Bookmarked Events
**Get** `/tourist/bookmarks`

#### 15. Save Product
**Post** `/tourist/save-product`

#### 16. Get Wishlist
**Get** `/tourist/wishlist`

#### 17. Remove from Wishlist
**Post** `/tourist/remove-wishlist`

#### 18. Add to Cart
**Post** `/tourist/cart`

#### 19. Remove from Cart
**Delete** `/tourist/cart`

#### 20. Get Cart
**Get** `/tourist/cart`

#### 21. Book Flight
**Post** `/tourist/book-flight`

#### 22. Complete Flight Booking Payment
**Post** `/tourist/flight-payment`

#### 23. Get Random Promo Code
**Get** `/promoCode`

#### 24. Get Notifications
**Get** `/tourist/notifications`

#### 25. Check Promo Code
**Post** `/tourist/checkPromoCode`

#### 26. Get Address
**Get** `/tourist/address`

#### 27. Add Address
**Post** `/tourist/address`

#### 28. Get Wallet and Total Points
**Get** `/tourist/wallet`

#### 29. Mark Notifications as Read
**Patch** `/tourist/markNotifications`

#### 30. Update Product Quantity
**Put** `/tourist/product-quantity`

</details>


<details>
 <summary>User</summary>
 
#### 1. Login
**Post** `/login` 

#### 2. get User Data
**Get** `/user-data` 

#### 3. Logout
**Post** `/logout` 

</details>

## Code style
This project uses  [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to ensure consistent code formatting.
## Tests
<details>
<summary>We use Postman to manually test all our API references by making sure the response is as expected. Below are examples of the testing:</summary>

<img src="https://github.com/user-attachments/assets/faf58e2b-7fb0-48e8-8b6b-69e967fe922f" alt="Test 1" width="470"/><br/>

<img src="https://github.com/user-attachments/assets/1d89f1b2-3043-472f-a784-d81d064b02a5" alt="Test 2" width="470"/><br/>

<img src="https://github.com/user-attachments/assets/aebf2057-7a9d-420e-aab4-ad0c24789f2b" alt="Test 3" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/f09e2ee0-0696-468f-bc3c-38ccdd4a695e" alt="Test 4" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/058157c2-c040-44cf-8de1-f6fc806d03ca" alt="Test 5" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/36af1923-e360-49f5-bd09-f88d1f7d393d" alt="Test 6" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/1c2c5f52-ed77-4918-baf0-4716db68f6dd" alt="Test 7" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/e982ff26-430e-4a84-b8f6-0e99e4cb0458" alt="Test 8" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/e4ecf482-d173-4b79-a7cc-048d166141c1" alt="Test 9" width="400"/><br/>

<img src="https://github.com/user-attachments/assets/cb72550b-06e0-48be-992f-57dc2c33ae04" alt="Test 10" width="400"/><br/>


</details>


## Contribute
To contribute:
1. Fork the repo
2. Create a new branch ```git checkout -b feature```
3. Add your changes
4. Commit your changes ```git commit -m 'add feature'```
5. Push to the branch ```git push origin feature```
6. Create a new Pull Request
7. The PR is to be reviewed and merged

## Credits
**Documentations**
- [MongoDB](https://www.mongodb.com/docs/) 
- [Mongoose](https://mongoosejs.com/docs/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [Postman](https://www.postman.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Stripe](https://stripe.com/docs)
  
**Youtube Videos**

- [Create a REST API with Node.js and Express](https://youtu.be/O3BUHwfHf84?si=RhnzgbodBxzWAL8b)
- [MERN Stack Tutorial](https://youtu.be/-0exw-9YJBo?si=_7WHciKbByTxXlTV)

## Deployment

This application is deployed and accessible at the following URL:
- Deployed on Vercel
- URL: https://tripal-sable.vercel.app/
## License


This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
See the LICENSE file for detailed terms and conditions.


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[npm]: https://img.shields.io/badge/npm-8C150D?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/

[Nodemailer]: https://img.shields.io/badge/Nodemailer-4ea94b?style=for-the-badge&logo=nodemailer&logoColor=white
[Nodemailer-url]: https://nodemailer.com/

[Mongoose]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/

[jsonwebtoken]: https://img.shields.io/badge/JSON_Web_Token-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jsonwebtoken-url]: https://github.com/auth0/node-jsonwebtoken

[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white
[ReactRouter-url]: https://reactrouter.com/

[MUI]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/

[FirebaseStorage]: https://img.shields.io/badge/Firebase_Storage-FFCA28?style=for-the-badge&logo=firebase&logoColor=white
[FirebaseStorage-url]: https://firebase.google.com/products/storage

[Bcrypt]: https://img.shields.io/badge/Bcrypt-6C757D?style=for-the-badge&logo=none&logoColor=white
[Bcrypt-url]: https://github.com/kelektiv/node.bcrypt.js

[AntDesign]: https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white
[AntDesign-url]: https://ant.design/

[NodeCron]: https://img.shields.io/badge/Node_Cron-000000?style=for-the-badge&logo=node&logoColor=white
[NodeCron-url]: https://www.npmjs.com/package/node-cron

[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/

[Prettier]: https://img.shields.io/badge/Prettier-FF69B4?style=for-the-badge&logo=prettier&logoColor=white
[Prettier-url]: https://prettier.io/
