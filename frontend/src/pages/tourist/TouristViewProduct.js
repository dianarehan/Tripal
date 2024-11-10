import React from "react";
import ProductDetails from "../../components/product/ProductDetails";
import TouristNavbar from "../../components/navbar/TouristNavBar";

const TouristViewProduct = () => {
  return (
    <div>
      <TouristNavbar />
      <ProductDetails homeURL={"/tourist"} productsURL={"/tourist/view-products"}/>
    </div>
  );
};

export default TouristViewProduct;