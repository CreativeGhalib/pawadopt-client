import { Button } from "@heroui/react";
import { Chrome, Image, Lock, Mail, PawPrint, User } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import useAuth from "../hooks/useAuth";
import authErrorMessage from "../utils/authErrorMessage";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { createUser, googleLogin, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const rules = useMemo(
    () => ({
      length: password.length >= 6,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      match: password && password === confirmPassword,
    }),
    [password, confirmPassword]
  );

  const saveUserAndJwt = async (firebaseUser) => {
    const userInfo = {
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };

    await axiosPublic.post("/users", userInfo);
    await axiosPublic.post("/jwt", userInfo);
  };

  const validatePassword = () => {
    if (!rules.length) return "Password must be at least 6 characters";
    if (!rules.upper) return "Password must include one uppercase letter";
    if (!rules.lower) return "Password must include one lowercase letter";
    if (!rules.match) return "Password and confirm password must match";
    return "";
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const validationError = validatePassword();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSubmitting(true);

    const form = event.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;

    try {
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      const updatedUser = {
        email: result.user.email,
        displayName: name,
        photoURL,
      };
      await saveUserAndJwt(updatedUser);
      toast.success("Account created successfully");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setSubmitting(true);

    try {
      const result = await googleLogin();
      await saveUserAndJwt(result.user);
      toast.success("Account ready with Google");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "focus-glow w-full rounded-2xl border border-outline bg-surface py-3 pl-12 pr-4 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950";

  const Rule = ({ active, label }) => (
    <p className={`text-xs font-semibold ${active ? "text-primary" : "text-muted dark:text-slate-400"}`}>
      {active ? "✓" : "○"} {label}
    </p>
  );

  return (
    <section className="container-width grid min-h-[calc(100vh-88px)] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-outline bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-9">
        <div className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-heading text-2xl font-extrabold text-primary">PawAdopt</span>
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Register</p>
          <h1 className="font-heading text-4xl font-extrabold text-ink dark:text-white">Create your account</h1>
          <p className="mt-3 text-muted dark:text-slate-300">
            Join PawAdopt to request adoptions, list pets, and manage safe matches.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Full Name</span>
            <span className="relative block">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
              <input name="name" required placeholder="Jane Doe" className={inputClass} />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">Email Address</span>
            <span className="relative block">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
              <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">Photo URL</span>
            <span className="relative block">
              <Image className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
              <input name="photoURL" type="url" placeholder="https://example.com/photo.jpg" className={inputClass} />
            </span>
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold">Password</span>
              <span className="relative block">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Confirm Password</span>
              <span className="relative block">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={inputClass}
                />
              </span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-surface-low p-4 dark:bg-slate-950">
            <Rule active={rules.length} label="6+ characters" />
            <Rule active={rules.upper} label="Uppercase letter" />
            <Rule active={rules.lower} label="Lowercase letter" />
            <Rule active={rules.match} label="Passwords match" />
          </div>

          <Button
            type="submit"
            isLoading={submitting}
            className="h-12 w-full rounded-2xl bg-primary font-black text-white"
          >
            Register
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-muted dark:text-slate-400">
          <span className="h-px flex-1 bg-outline dark:bg-slate-700" />
          Or
          <span className="h-px flex-1 bg-outline dark:bg-slate-700" />
        </div>

        <Button
          onClick={handleGoogleRegister}
          isDisabled={submitting}
          variant="bordered"
          className="h-12 w-full rounded-2xl border-outline font-bold text-ink dark:border-slate-700 dark:text-white"
        >
          <Chrome className="h-5 w-5" /> Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted dark:text-slate-300">
          Already have an account?{" "}
          <Link to="/login" state={{ from: location.state?.from }} className="font-bold text-primary">
            Login here
          </Link>
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-[2rem] border-8 border-white shadow-soft dark:border-slate-900 lg:block">
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200"
          alt="Friendly pet waiting for adoption"
          className="h-[720px] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
