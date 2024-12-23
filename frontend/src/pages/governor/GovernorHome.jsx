import GovernorHeader from "../../components/layout/header/GovernorHeader";
import FooterThree from "@/components/layout/footers/FooterThree";
import MetaComponent from "@/components/common/MetaComponent";
import Information from "@/components/pages/about/Information";
import FeturesTwo from "@/components/homes/features/FeturesTwo";

const metadata = {
  title: "Home || Tripal",
};

const GovernorHome = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="page-wrapper">
        <GovernorHeader />
        <main className="page-content">
          <FeturesTwo />
          <Information />
          <div className="admin-content-details"></div>
        </main>
        <FooterThree />
      </div>
    </>
  );
};

export default GovernorHome;