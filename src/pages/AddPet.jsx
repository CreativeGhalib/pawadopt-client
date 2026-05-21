import { Button } from "@heroui/react";
import {
  Activity,
  BadgeDollarSign,
  HeartPulse,
  Image,
  MapPin,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];
const genderOptions = ["Male", "Female", "Unknown"];
const healthOptions = ["Healthy", "Needs care", "Special needs", "Recovering"];
const vaccinationOptions = ["Fully vaccinated", "Partially vaccinated", "Not vaccinated", "Unknown"];

const AddPet = () => {
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const petData = Object.fromEntries(formData.entries());

    try {
      const { data } = await axiosSecure.post("/pets", petData);

      if (data.insertedId) {
        toast.success("Pet listing added successfully");
        navigate("/dashboard/my-listings");
        return;
      }

      toast.success("Pet listing saved");
      navigate("/dashboard/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add pet listing");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "focus-glow w-full rounded-2xl border border-outline bg-surface px-4 py-3 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950";

  const FieldLabel = ({ icon: Icon, children }) => (
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
      <Icon className="h-4 w-4 text-primary" /> {children}
    </span>
  );

  return (
    <div>
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Add Pet</p>
          <h1 className="font-heading text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
            Create a new adoption listing
          </h1>
          <p className="mt-3 max-w-2xl text-muted dark:text-slate-300">
            Add clear details, a hosted image URL, and care information so adopters can request
            responsibly.
          </p>
        </div>

        <div className="rounded-3xl border border-outline bg-surface-low p-5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <Image className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold leading-6 text-muted dark:text-slate-300">
              Host pet images on imgbb or postimage, then paste the direct image URL here.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label>
            <FieldLabel icon={PawPrint}>Pet Name</FieldLabel>
            <input name="petName" required placeholder="Milo" className={inputClass} />
          </label>

          <label>
            <FieldLabel icon={PawPrint}>Species</FieldLabel>
            <select name="species" required className={inputClass} defaultValue="">
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
            <input name="breed" required placeholder="Labrador Mix" className={inputClass} />
          </label>

          <label>
            <FieldLabel icon={Activity}>Age</FieldLabel>
            <input name="age" required placeholder="2 years" className={inputClass} />
          </label>

          <label>
            <FieldLabel icon={ShieldCheck}>Gender</FieldLabel>
            <select name="gender" required className={inputClass} defaultValue="">
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
              placeholder="https://i.ibb.co/example/pet.jpg"
              className={inputClass}
            />
          </label>

          <label>
            <FieldLabel icon={HeartPulse}>Health Status</FieldLabel>
            <select name="healthStatus" required className={inputClass} defaultValue="">
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
            <select name="vaccinationStatus" required className={inputClass} defaultValue="">
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
            <input name="location" required placeholder="Dhaka, Bangladesh" className={inputClass} />
          </label>

          <label>
            <FieldLabel icon={BadgeDollarSign}>Adoption Fee</FieldLabel>
            <input name="adoptionFee" type="number" min="0" required placeholder="1500" className={inputClass} />
          </label>

          <label className="md:col-span-2">
            <FieldLabel icon={ShieldCheck}>Owner Email</FieldLabel>
            <input
              name="ownerEmail"
              value={user?.email || ""}
              readOnly
              className={`${inputClass} cursor-not-allowed text-muted`}
            />
          </label>

          <label className="md:col-span-2">
            <FieldLabel icon={PawPrint}>Description</FieldLabel>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Describe the pet's personality, routine, care needs, and preferred home."
              className={`${inputClass} resize-none`}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 border-t border-outline pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-end">
          <Button type="reset" variant="bordered" className="rounded-2xl border-outline font-bold text-muted">
            Reset
          </Button>
          <Button type="submit" isLoading={submitting} className="rounded-2xl bg-primary px-8 font-black text-white">
            Add Pet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
