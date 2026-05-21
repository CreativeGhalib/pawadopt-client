import { NavLink, Outlet } from "react-router-dom";
import { ClipboardList, Heart, ListPlus, PawPrint } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const menuItems = [
    { name: "My Requests", path: "/dashboard/my-requests", icon: ClipboardList },
    { name: "Add Pet", path: "/dashboard/add-pet", icon: ListPlus },
    { name: "My Listings", path: "/dashboard/my-listings", icon: PawPrint },
    { name: "My Wishlist", path: "/dashboard/wishlist", icon: Heart },
  ];

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
      isActive
        ? "bg-primary text-white shadow-soft"
        : "text-slate-700 hover:bg-surface-low dark:text-slate-200 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="min-h-screen bg-surface text-ink dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="container-width grid gap-6 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-outline bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 px-2">
            <p className="text-xs font-bold uppercase text-primary">Dashboard</p>
            <h2 className="font-heading text-2xl font-extrabold">Adoption Center</h2>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink key={item.name} to={item.path} className={menuClass}>
                  <Icon className="h-4 w-4" /> {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <section className="min-h-[65vh] rounded-3xl border border-outline bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <Outlet />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
