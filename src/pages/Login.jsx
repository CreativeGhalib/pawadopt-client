import { Button } from "@heroui/react";
import { Chrome, Lock, Mail, PawPrint } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import useAuth from "../hooks/useAuth";
import authErrorMessage from "../utils/authErrorMessage";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const syncJwt = async (firebaseUser) => {
    await axiosPublic.post("/jwt", {
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginUser(email, password);
      await syncJwt(result.user);
      toast.success("Welcome back to PawAdopt");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);

    try {
      const result = await googleLogin();
      await axiosPublic.post("/users", {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
      });
      await syncJwt(result.user);
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-width grid min-h-[calc(100vh-88px)] items-center gap-10 py-12 lg:grid-cols-2">
      <div className="hidden overflow-hidden rounded-[2rem] border-8 border-white shadow-soft dark:border-slate-900 lg:block">
        <img
          src="/images/login-panel.webp"
          alt="Happy adopted pet resting at home"
          className="h-[620px] w-full object-cover"
        />
      </div>

      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-outline bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-9">
        <div className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-heading text-2xl font-extrabold text-primary">PawAdopt</span>
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Login</p>
          <h1 className="font-heading text-4xl font-extrabold text-ink dark:text-white">Welcome back</h1>
          <p className="mt-3 text-muted dark:text-slate-300">
            Continue your adoption journey and manage requests from your dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-ink dark:text-white">Email Address</span>
            <span className="relative block">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="focus-glow w-full rounded-2xl border border-outline bg-surface py-3 pl-12 pr-4 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-ink dark:text-white">Password</span>
            <span className="relative block">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="focus-glow w-full rounded-2xl border border-outline bg-surface py-3 pl-12 pr-4 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950"
              />
            </span>
          </label>

          <Button
            type="submit"
            isLoading={submitting}
            className="h-12 w-full rounded-2xl bg-primary font-black text-white"
          >
            Login
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-muted dark:text-slate-400">
          <span className="h-px flex-1 bg-outline dark:bg-slate-700" />
          Or
          <span className="h-px flex-1 bg-outline dark:bg-slate-700" />
        </div>

        <Button
          onClick={handleGoogleLogin}
          isDisabled={submitting}
          variant="bordered"
          className="h-12 w-full rounded-2xl border-outline font-bold text-ink dark:border-slate-700 dark:text-white"
        >
          <Chrome className="h-5 w-5" /> Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted dark:text-slate-300">
          New to PawAdopt?{" "}
          <Link to="/register" state={{ from: location.state?.from }} className="font-bold text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
