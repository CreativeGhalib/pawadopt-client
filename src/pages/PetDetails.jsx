import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import {
  Activity,
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  HeartPulse,
  Mail,
  MapPin,
  MessageSquare,
  PawPrint,
  ShieldCheck,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

// ---------- small helpers ----------

const Detail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-outline bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-low text-primary dark:bg-slate-800">
      <Icon className="h-4 w-4" />
    </span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-ink dark:text-white">{value || "—"}</p>
    </div>
  </div>
);

const StatusChip = ({ status }) => {
  const isAdopted = status === "adopted";
  return (
    <Chip
      size="sm"
      className={
        isAdopted
          ? "bg-amber-100 text-xs font-bold text-amber-700"
          : "bg-emerald-100 text-xs font-bold text-emerald-700"
      }
    >
      {isAdopted ? "Adopted" : "Available"}
    </Chip>
  );
};

// ---------- Adoption Form Modal ----------

const AdoptionModal = ({ pet, user, onClose, axiosSecure }) => {
  const [form, setForm] = useState({ pickupDate: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef(null);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.pickupDate) {
      toast.error("Please select a pickup date");
      return;
    }

    setSubmitting(true);

    try {
      await axiosSecure.post("/adoption-requests", {
        petId: pet._id,
        petName: pet.petName,
        ownerEmail: pet.ownerEmail,
        pickupDate: form.pickupDate,
        message: form.message,
      });

      toast.success("Adoption request submitted! The owner will review it shortly.");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  // get tomorrow as min date for pickup
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputClass =
    "w-full rounded-2xl border border-outline bg-surface px-4 py-3 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-3xl border border-outline bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-outline px-6 py-4 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Adopt</p>
              <h2 className="font-heading text-xl font-extrabold text-ink dark:text-white">
                Request to adopt {pet.petName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-muted transition hover:bg-surface hover:text-ink dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {/* read-only: pet name */}
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <PawPrint className="h-4 w-4 text-primary" /> Pet Name
              </span>
              <input
                value={pet.petName}
                readOnly
                className={`${inputClass} cursor-not-allowed text-muted`}
              />
            </label>

            {/* read-only: your name */}
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <HeartHandshake className="h-4 w-4 text-primary" /> Your Name
              </span>
              <input
                value={user?.displayName || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed text-muted`}
              />
            </label>

            {/* read-only: your email */}
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Your Email
              </span>
              <input
                value={user?.email || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed text-muted`}
              />
            </label>

            {/* pickup date */}
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <CalendarDays className="h-4 w-4 text-primary" /> Preferred Pickup Date
              </span>
              <input
                name="pickupDate"
                type="date"
                required
                min={minDate}
                value={form.pickupDate}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            {/* message */}
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <MessageSquare className="h-4 w-4 text-primary" /> Message to Owner
              </span>
              <textarea
                name="message"
                rows="3"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell the owner why you'd be a great fit for this pet..."
                className={`${inputClass} resize-none`}
              />
            </label>

            <div className="flex flex-col gap-3 border-t border-outline pt-4 dark:border-slate-800 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="bordered"
                onClick={onClose}
                isDisabled={submitting}
                className="rounded-2xl border-outline font-bold text-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={submitting}
                className="rounded-2xl bg-primary px-8 font-black text-white"
              >
                <HeartHandshake className="h-4 w-4" /> Submit Request
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ---------- PetDetails ----------

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adoptModalOpen, setAdoptModalOpen] = useState(false);

  const fetchPet = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosSecure.get(`/pets/${id}`);
      setPet(data);
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        setError("This pet listing was not found.");
      } else {
        setError(err.response?.data?.message || "Could not load pet details.");
      }
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, id]);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center">
        <PawPrint className="mx-auto h-14 w-14 text-muted" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold text-ink dark:text-white">
          {error || "Pet not found"}
        </h2>
        <Button
          onClick={() => navigate("/pets")}
          className="mt-6 rounded-full bg-primary px-8 font-bold text-white"
        >
          Browse Pets
        </Button>
      </div>
    );
  }

  const isOwner = user?.email === pet.ownerEmail;
  const isAdopted = pet.status === "adopted";
  const canAdopt = !isOwner && !isAdopted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-5xl px-4 py-10"
    >
      {/* back button */}
      <Button
        variant="bordered"
        onClick={() => navigate("/pets")}
        className="mb-6 rounded-2xl border-outline font-semibold text-muted dark:border-slate-700 dark:text-slate-300"
      >
        <ArrowLeft className="h-4 w-4" /> Back to All Pets
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* left — image + description */}
        <div>
          {/* image */}
          <div className="overflow-hidden rounded-3xl border border-outline shadow-sm dark:border-slate-800">
            <img
              src={
                pet.imageUrl ||
                "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=900"
              }
              alt={pet.petName}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* description */}
          <div className="mt-6 rounded-3xl border border-outline bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 font-heading text-xl font-extrabold text-ink dark:text-white">
              About {pet.petName}
            </h2>
            <p className="leading-relaxed text-muted dark:text-slate-300">
              {pet.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* right — info panel */}
        <div className="space-y-4">
          {/* name + status */}
          <div className="rounded-3xl border border-outline bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {pet.species}
                </p>
                <h1 className="font-heading text-3xl font-extrabold text-ink dark:text-white">
                  {pet.petName}
                </h1>
                {pet.breed && (
                  <p className="mt-1 text-sm font-semibold text-muted dark:text-slate-400">
                    {pet.breed}
                  </p>
                )}
              </div>
              <StatusChip status={pet.status} />
            </div>

            {/* adoption fee */}
            <div className="mt-4 flex items-center gap-2 text-xl font-extrabold text-secondary">
              <BadgeDollarSign className="h-5 w-5" />
              Tk {pet.adoptionFee ?? 0} adoption fee
            </div>

            {/* adopt / disabled button */}
            <div className="mt-5">
              {isOwner ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center dark:border-amber-900/40 dark:bg-amber-950/20">
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                    You cannot adopt your own listed pet
                  </p>
                </div>
              ) : isAdopted ? (
                <div className="rounded-2xl border border-outline bg-surface-low px-4 py-3 text-center dark:border-slate-800 dark:bg-slate-800">
                  <p className="text-sm font-bold text-muted dark:text-slate-400">
                    This pet has already been adopted
                  </p>
                  <Button
                    isDisabled
                    size="sm"
                    className="mt-2 w-full rounded-xl bg-surface font-bold text-muted dark:bg-slate-700 dark:text-slate-500"
                  >
                    Adoption Closed
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setAdoptModalOpen(true)}
                  className="w-full rounded-2xl bg-primary font-black text-white"
                >
                  <HeartHandshake className="h-4 w-4" /> Request Adoption
                </Button>
              )}
            </div>
          </div>

          {/* details grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Detail icon={Activity} label="Age" value={pet.age} />
            <Detail icon={PawPrint} label="Gender" value={pet.gender} />
            <Detail icon={HeartPulse} label="Health Status" value={pet.healthStatus} />
            <Detail icon={ShieldCheck} label="Vaccination" value={pet.vaccinationStatus} />
            <Detail icon={MapPin} label="Location" value={pet.location} />
            <Detail icon={Mail} label="Listed by" value={pet.ownerEmail} />
          </div>
        </div>
      </div>

      {/* adoption modal */}
      {adoptModalOpen && canAdopt && (
        <AdoptionModal
          pet={pet}
          user={user}
          onClose={() => setAdoptModalOpen(false)}
          axiosSecure={axiosSecure}
        />
      )}
    </motion.div>
  );
};

export default PetDetails;
