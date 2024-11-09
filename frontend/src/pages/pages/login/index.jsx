import FooterSix from "@/components/layout/footers/FooterSix";
import Header3 from "@/components/layout/header/Header3";
import Login from "@/components/pages/Login";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header3 />
        <Login />
        <FooterSix />
      </main>
    </>
  );
}
