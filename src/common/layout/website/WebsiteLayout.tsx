import ScrollToTopButton from "./scroll-to-top/ScrollToTopButton";
import StickyNavbar from "./sticky-navbar/StickyNavbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import { WebsiteSettingsProvider } from "@/store/WebsiteSettingsProvider";
import PageSeo from "@/common/components/seo/PageSeo";
const WebsiteLayout = () => {
  return (
    <WebsiteSettingsProvider>
      <PageSeo />
      <div className="flex flex-col min-h-screen mt-[55px]">
        <ScrollToTopButton />
        <StickyNavbar />

        <main className="flex flex-col py-2 grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </WebsiteSettingsProvider>
  );
};

export default WebsiteLayout;
