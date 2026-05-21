import { Button } from "@heroui/react";
import { ArrowLeft, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-5 dark:bg-slate-950">
      <div className="max-w-xl rounded-3xl border border-outline bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white">
          <PawPrint className="h-8 w-8" />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">404</p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold text-ink dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-muted dark:text-slate-300">
          The page you are looking for is unavailable or has been moved.
        </p>
        <Button as={Link} to="/" className="mt-7 rounded-full bg-primary px-7 font-bold text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
