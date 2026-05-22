import { Facebook, Instagram, Mail, MapPin, PawPrint, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-outline bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-width grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr]">
        {/* brand */}
        <div>
          <Link to="/" className="mb-5 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-heading text-2xl font-extrabold text-ink dark:text-white">PawAdopt</span>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-muted dark:text-slate-300">
            A caring adoption platform for Bangladesh, built to connect responsible adopters with pets
            waiting for safe, loving homes.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-primary transition hover:bg-primary hover:text-white dark:bg-slate-900"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-primary transition hover:bg-primary hover:text-white dark:bg-slate-900"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* quick links */}
        <div>
          <h3 className="mb-5 font-heading text-base font-bold uppercase tracking-widest text-ink dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "All Pets", to: "/pets" },
              { label: "Add a Pet", to: "/dashboard/add-pet" },
              { label: "My Requests", to: "/dashboard/my-requests" },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-muted transition hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h3 className="mb-5 font-heading text-base font-bold uppercase tracking-widest text-ink dark:text-white">
            Contact
          </h3>
          <div className="space-y-3 text-sm text-muted dark:text-slate-300">
            <a
              href="mailto:mesbah.ghalib@gmail.com"
              className="flex items-center gap-2 transition hover:text-primary"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              mesbah.ghalib@gmail.com
            </a>
            <a
              href="tel:+8801717136149"
              className="flex items-center gap-2 transition hover:text-primary"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              +880 1717 136149
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-outline dark:border-slate-800">
        <div className="container-width flex flex-col items-center justify-between gap-2 py-5 text-sm text-muted dark:text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-ink dark:text-white">PawAdopt</span>. All rights reserved.
          </p>
          <p>
            Designed &amp; built by{" "}
            <span className="font-semibold text-primary">Mesbah Ghalib</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
