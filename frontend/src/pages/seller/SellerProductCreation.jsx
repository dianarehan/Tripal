import ProductForm from "../../components/product/ProductForm";
import FooterThree from "@/components/layout/footers/FooterThree";
import SellerHeader from "@/components/layout/header/SellerHeader";

const SellerProductCreation = () => {
  return (
    <div>
      <SellerHeader/><br/><br/><br/><br/>
      <ProductForm /><br/>
      <FooterThree />
    </div>
  );
};

export default SellerProductCreation;
