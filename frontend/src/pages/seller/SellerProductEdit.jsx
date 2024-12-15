import ProductForm from "../../components/product/ProductForm";
import FooterThree from "@/components/layout/footers/FooterThree";
import SellerHeader from "@/components/layout/header/SellerHeader";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || Tripal",
};

const SellerProductEdit = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="page-wrapper">
        <SellerHeader />
        <main className="page-content">
          <ProductForm />
        </main>
        <FooterThree />
      </div>
    </>
  );
};

export default SellerProductEdit;
