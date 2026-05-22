import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-surface text-ink dark:bg-slate-950 dark:text-slate-100">
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
