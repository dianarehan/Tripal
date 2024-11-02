const sellerId = "67092b1651baf2ce64114a26";
const tourismGovernerID = "6703aa9d78a7632a67a38dfe";
const adminId = "670c3f8b4d912d42ccf5580c";
const touristId = "6724842b5831eed787083b57"; // DONT DELETE 
const advertiserID = "672656803a131c37ea3b0cfb"; // advertiser profile final NEVER DELETE 

//mimics what will be in token to adjust some component
// features based on it
//change to test different roles in the website
const currUser = touristId;
const userRole = "Tourist"; //used to test [Admin, Tourist, Seller]

module.exports = {
  currUser,
  userRole,
  sellerId,
  tourismGovernerID,
  adminId,
  touristId,
  advertiserID,
};
