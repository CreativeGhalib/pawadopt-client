import { ArrowRight, Facebook, Instagram, Mail, MapPin, PawPrint, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "All Pets", to: "/pets" },
    { label: "Add a Pet", to: "/dashboard/add-pet" },
    { label: "My Requests", to: "/dashboard/my-requests" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/FreelancerMesbahGhalib/",
      icon: Facebook,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mesbahghalib/",
      icon: Instagram,
    },
  ];

  return (
    <footer className="border-t border-primary/10 bg-slate-950 text-white">
      <div className="container-width py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr_1fr] lg:items-start">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <PawPrint className="h-6 w-6" />
              </span>
              <span className="font-heading text-3xl font-extrabold">PawAdopt</span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              A caring adoption platform for Bangladesh, built to connect responsible adopters with pets
              waiting for safe, loving homes.
            </p>

            <Link
              to="/pets"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-black text-white shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary/90"
            >
              Browse Pets <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.18em] text-primary-soft">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-2 text-slate-300 transition hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.18em] text-primary-soft">
              Contact
            </h3>
            <div className="space-y-4 text-sm text-slate-300">
              <a
                href="mailto:mesbah.ghalib@gmail.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-soft">
                  <Mail className="h-4 w-4" />
                </span>
                mesbah.ghalib@gmail.com
              </a>
              <a
                href="tel:+8801717136149"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-soft">
                  <Phone className="h-4 w-4" />
                </span>
                +880 1717 136149
              </a>
              <p className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-soft">
                  <MapPin className="h-4 w-4" />
                </span>
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/15">
        <div className="container-width flex flex-col items-center justify-between gap-3 py-5 text-sm text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">PawAdopt</span>. All rights reserved.
          </p>
          <p>
            Designed &amp; built by <span className="font-semibold text-primary-soft">Mesbah Ghalib</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
