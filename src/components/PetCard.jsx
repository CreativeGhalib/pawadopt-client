import { Button, Chip } from "@heroui/react";
import { HeartHandshake, MapPin, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

const PetCard = ({ pet, showAdopt = false, onAdopt }) => {
  const {
    _id,
    petName,
    species,
    breed,
    age,
    gender,
    imageUrl,
    location,
    adoptionFee,
    status,
  } = pet;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-outline bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-low">
        <img
          src={imageUrl || "/images/pet-placeholder.webp"}
          alt={petName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Chip size="sm" className="bg-primary text-xs font-bold text-white">
            {species}
          </Chip>
          <Chip
            size="sm"
            className={
              status === "adopted"
                ? "bg-amber-100 text-xs font-bold text-amber-700"
                : "bg-emerald-100 text-xs font-bold text-emerald-700"
            }
          >
            {status || "available"}
          </Chip>
        </div>
      </div>

      <div className="flex grow flex-col p-5">
        <div className="mb-4">
          <h3 className="font-heading text-xl font-extrabold text-ink transition group-hover:text-primary dark:text-white">
            {petName}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted dark:text-slate-300">
            {breed} {age ? `. ${age}` : ""} {gender ? `. ${gender}` : ""}
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="flex items-center gap-2 text-sm text-muted dark:text-slate-300">
            <MapPin className="h-4 w-4 text-primary" />
            {location || "Bangladesh"}
          </p>
          <p className="font-black text-secondary">Tk {adoptionFee || 0}</p>
        </div>

        <div className={`mt-auto grid gap-3 ${showAdopt ? "sm:grid-cols-2" : ""}`}>
          <Button
            as={Link}
            to={`/pets/${_id}`}
            className="rounded-full border border-primary bg-white font-bold text-primary hover:bg-primary hover:text-white dark:bg-slate-900"
            variant="bordered"
          >
            <PawPrint className="h-4 w-4" /> View Details
          </Button>

          {showAdopt && (
            status === "adopted" ? (
              <div className="flex items-center justify-center rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                Adopted
              </div>
            ) : (
              <Button
                onClick={() => onAdopt?.(pet)}
                className="rounded-full bg-secondary font-bold text-white"
              >
                <HeartHandshake className="h-4 w-4" /> Adopt Now
              </Button>
            )
          )}
        </div>
      </div>
    </article>
  );
};

export default PetCard;
