import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BadgeDollarSign,
  HeartPulse,
  Image,
  MapPin,
  PawPrint,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

// ---------- constants ----------

const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];
const genderOptions = ["Male", "Female", "Unknown"];
const healthOptions = ["Healthy", "Needs care", "Special needs", "Recovering"];
const vaccinationOptions = [
  "Fully vaccinated",
  "Partially vaccinated",
  "Not vaccinated",
  "Unknown",
];

// ---------- EditPetModal ----------

/**
 * @param {{ pet: object, onClose: () => void, onUpdated: (pet: object) => void, axiosSecure: import("axios").AxiosInstance }} props
 */
const EditPetModal = ({ pet, onClose, onUpdated, axiosSecure }) => {
  const [form, setForm] = useState({
    petName: pet.petName || "",
    species: pet.species || "",
    breed: pet.breed || "",
    age: pet.age || "",
    gender: pet.gender || "",
    imageUrl: pet.imageUrl || "",
    healthStatus: pet.healthStatus || "",
    vaccinationStatus: pet.vaccinationStatus || "",
    location: pet.location || "",
    adoptionFee: pet.adoptionFee ?? "",
    description: pet.description || "",
  });

  const [submitting, setSubmitting] = useState(false);
  const overlayRef = useRef(null);

  // close on Escape key
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
    setSubmitting(true);

    try {
      await axiosSecure.patch(`/pets/${pet._id}`, form);
      toast.success("Pet listing updated");
      onUpdated({ ...pet, ...form, adoptionFee: Number(form.adoptionFee) });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update pet");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-outline bg-surface px-4 py-3 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  const FieldLabel = ({ icon: Icon, children }) => (
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
      <Icon className="h-4 w-4 text-primary" /> {children}
    </span>
  );

  // click on backdrop closes modal
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
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-3xl border border-outline bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-outline px-6 py-4 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Edit Pet</p>
              <h2 className="font-heading text-xl font-extrabold text-ink dark:text-white">
                Update listing
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
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <FieldLabel icon={PawPrint}>Pet Name</FieldLabel>
                <input
                  name="petName"
                  required
                  value={form.petName}
                  onChange={handleChange}
                  placeholder="Milo"
                  className={inputClass}
                />
              </label>

              <label>
                <FieldLabel icon={PawPrint}>Species</FieldLabel>
                <select
                  name="species"
                  required
                  value={form.species}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select species
                  </option>
                  {speciesOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <FieldLabel icon={PawPrint}>Breed</FieldLabel>
                <input
                  name="breed"
                  required
                  value={form.breed}
                  onChange={handleChange}
                  placeholder="Labrador Mix"
                  className={inputClass}
                />
              </label>

              <label>
                <FieldLabel icon={Activity}>Age</FieldLabel>
                <input
                  name="age"
                  required
                  value={form.age}
                  onChange={handleChange}
                  placeholder="2 years"
                  className={inputClass}
                />
              </label>

              <label>
                <FieldLabel icon={ShieldCheck}>Gender</FieldLabel>
                <select
                  name="gender"
                  required
                  value={form.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  {genderOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <FieldLabel icon={Image}>Image URL</FieldLabel>
                <input
                  name="imageUrl"
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://i.ibb.co/example/pet.jpg"
                  className={inputClass}
                />
              </label>

              <label>
                <FieldLabel icon={HeartPulse}>Health Status</FieldLabel>
                <select
                  name="healthStatus"
                  required
                  value={form.healthStatus}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select health status
                  </option>
                  {healthOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <FieldLabel icon={ShieldCheck}>Vaccination Status</FieldLabel>
                <select
                  name="vaccinationStatus"
                  required
                  value={form.vaccinationStatus}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select vaccination status
                  </option>
                  {vaccinationOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <FieldLabel icon={MapPin}>Location</FieldLabel>
                <input
                  name="location"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Dhaka, Bangladesh"
                  className={inputClass}
                />
              </label>

              <label>
                <FieldLabel icon={BadgeDollarSign}>Adoption Fee</FieldLabel>
                <input
                  name="adoptionFee"
                  type="number"
                  min="0"
                  required
                  value={form.adoptionFee}
                  onChange={handleChange}
                  placeholder="1500"
                  className={inputClass}
                />
              </label>

              <label className="md:col-span-2">
                <FieldLabel icon={PawPrint}>Description</FieldLabel>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the pet's personality, routine, care needs, and preferred home."
                  className={`${inputClass} resize-none`}
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-outline pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
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
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditPetModal;
