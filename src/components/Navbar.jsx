import { useEffect, useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { LayoutDashboard, LogOut, Menu, PawPrint, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const publicNavItems = [
    { name: "Home", path: "/" },
    { name: "All Pets", path: "/pets" },
  ];

  const privateNavItems = [
    { name: "My Requests", path: "/dashboard/my-requests" },
    { name: "Add Pet", path: "/dashboard/add-pet" },
  ];

  const navItems = user ? [...publicNavItems, ...privateNavItems] : publicNavItems;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? "text-primary"
        : "text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-soft"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/60 bg-white/75 py-2 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
          : "border-transparent bg-surface py-3 dark:bg-slate-950"
      }`}
    >
      <div className="container-width flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white transition-transform group-hover:rotate-6">
            <PawPrint className="h-5 w-5" />
          </span>
          <span className="font-heading text-2xl font-extrabold text-ink dark:text-white">PawAdopt</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} className={linkClass}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {!loading && !user && (
            <Button as={Link} to="/login" className="rounded-full bg-primary px-7 font-bold text-white">
              Login
            </Button>
          )}

          {!loading && user && (
            <div className="group relative">
              <button className="flex items-center gap-3 rounded-full border border-transparent p-1 transition hover:border-outline hover:bg-white dark:hover:border-slate-700 dark:hover:bg-slate-900">
                <Avatar
                  src={user.photoURL || "https://i.ibb.co/7JZfF7S/default-avatar.png"}
                  name={user.displayName || user.email}
                  size="sm"
                  className="ring-2 ring-primary/10"
                />
                <div className="hidden max-w-32 text-left lg:block">
                  <p className="truncate text-sm font-bold text-ink dark:text-white">
                    {user.displayName || "PawAdopt User"}
                  </p>
                  <p className="truncate text-xs text-muted dark:text-slate-400">{user.email}</p>
                </div>
              </button>

              <div className="absolute right-0 top-12 hidden w-60 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft group-hover:flex dark:border-slate-800 dark:bg-slate-900">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-surface-low dark:hover:bg-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-outline bg-white dark:border-slate-700 dark:bg-slate-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-outline bg-white px-5 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-surface-low dark:hover:bg-slate-900"
              >
                {item.name}
              </NavLink>
            ))}

            {!loading && !user && (
              <Button as={Link} to="/login" className="mt-2 rounded-xl bg-primary font-bold text-white">
                Login
              </Button>
            )}

            {!loading && user && (
              <button
                onClick={handleLogOut}
                className="mt-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
