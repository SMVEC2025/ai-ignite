import { useEffect, useState } from "react";
import Footer1 from "../../components/footers/Footer1";
import Banner from "../../components/homes/home-1/Banner";
import Cta from "../../components/homes/home-1/Cta";
import Features from "../../components/homes/home-1/Features";
import Features2 from "../../components/homes/home-1/Features2";
import Faq from "../../components/homes/home-1/Faq";
import Service from "../../components/homes/home-1/Service";
import Partners from "../../components/homes/home-1/Partners";
import Pricing from "../../components/homes/home-1/Pricing";
import Result from "../../components/homes/home-1/Result";
import Roadmap from "../../components/homes/home-1/Roadmap";
import Tool from "../../components/homes/home-1/Tool";
import ScrollTop from "../../components/common/ScrollTop";
import WideCountdown from "../../components/homes/home-1/WideCounter";
import Navbar from "../../components/navbar/Index";
import { useAuth } from "../../context/AuthContext";
import { getMyTeamId } from '../../lib/team';

export const metadata = {
  title: "Home 1 | SMVEC- AI Writer & Copywriting Nextjs Template",
  description: "SMVEC - AI Writer & Copywriting Nextjs Template",
};

export default function Index() {
  const { session, loading } = useAuth();
  const [hasTeam, setHasTeam] = useState(false);
  useEffect(() => {
    (async () => {
      if (!session) return;
      setHasTeam(Boolean(await getMyTeamId()));
    })();
  }, [session]);
  if (loading) return <div> <div className="loader">
    <div className="loader-spinner"></div>
    <p className="loader-text">Loading...</p>
  </div></div>;

  return (
    <>
      <div id="wrapper">
        <div id="page" className="">
          <Banner />
          {/* <Result /> */}
          {/* <Partners /> */}
          {/* <WideCountdown/> */}
          <Features />
          {/* <Tool /> */}
          {/* <Features2 /> */}
          <Service />
          <Roadmap />
          {/* <Pricing /> */}
          <Faq />
          <Cta />
          <Footer1 />
        </div>
      </div>

      {/* <ScrollTop /> */}
    </>
  );
}
