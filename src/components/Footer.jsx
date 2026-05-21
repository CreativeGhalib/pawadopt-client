import { Facebook, Instagram, Mail, MapPin, PawPrint, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-outline bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-width grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-heading text-2xl font-extrabold text-ink dark:text-white">PawAdopt</span>
          </Link>
          <p className="max-w-md text-sm leading-6 text-muted dark:text-slate-300">
            A caring adoption platform for Bangladesh, built to connect responsible adopters with pets
            waiting for safe homes.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-ink dark:text-white">Contact</h3>
          <div className="space-y-3 text-sm text-muted dark:text-slate-300">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> hello@pawadopt.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +880 1700 000000
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-ink dark:text-white">Social</h3>
          <div className="flex gap-3">
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-primary transition hover:bg-primary hover:text-white dark:bg-slate-900">
              <Facebook className="h-4 w-4" />
            </a>
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-low text-primary transition hover:bg-primary hover:text-white dark:bg-slate-900">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-outline py-4 text-center text-sm text-muted dark:border-slate-800 dark:text-slate-400">
        Copyright {new Date().getFullYear()} PawAdopt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
