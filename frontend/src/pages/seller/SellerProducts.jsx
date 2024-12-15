import ProductList from "../../components/product/ProductList";
import FooterThree from "@/components/layout/footers/FooterThree";
import SellerHeader from "@/components/layout/header/SellerHeader";

const SellerProducts = () => {
  return (
    <div>
      <SellerHeader /><br/>
      <ProductList />
      <FooterThree />
    </div>
  );
};

export default SellerProducts;
