import { useState, useEffect } from "react";
import { Button, Chip } from "@heroui/react";
import { Heart, PawPrint, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosSecure from "../api/axiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionHeader from "../components/SectionHeader";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosSecure.get("/wishlists");
        setItems(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleRemove = async (petId, petName) => {
    setRemoving(petId);
    try {
      await axiosSecure.delete(`/wishlists/${petId}`);
      setItems((prev) => prev.filter((item) => item.petId !== petId));
      toast.success(`${petName} removed from wishlist`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove");
    } finally {
      setRemoving(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-muted dark:text-slate-400">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="rounded-full bg-primary font-bold text-white"
          size="sm"
        >
          Retry
        </Button>
      </div>
    );

  return (
    <div>
      <SectionHeader
        eyebrow="My Wishlist"
        title="Saved Pets"
        description={
          items.length > 0
            ? `You have ${items.length} pet${items.length > 1 ? "s" : ""} saved`
            : "Pets you save will appear here"
        }
      />

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20">
            <Heart className="h-10 w-10 text-red-300 dark:text-red-800" />
          </div>
          <p className="font-heading text-xl font-bold text-ink dark:text-white">
            No saved pets yet
          </p>
          <p className="max-w-sm text-muted dark:text-slate-400">
            Browse pets and tap the{" "}
            <Heart className="inline h-4 w-4 text-red-400" /> heart icon on any
            card to save it here.
          </p>
          <Button
            as={Link}
            to="/pets"
            className="rounded-full bg-primary font-bold text-white"
          >
            <PawPrint className="h-4 w-4" /> Browse Pets
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item._id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-outline bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.petImage || "/images/pet-placeholder.webp"}
                  alt={item.petName}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Chip size="sm" className="bg-primary text-xs font-bold text-white">
                    {item.species}
                  </Chip>
                  <Chip
                    size="sm"
                    className={
                      item.status === "adopted"
                        ? "bg-amber-100 text-xs font-bold text-amber-700"
                        : "bg-emerald-100 text-xs font-bold text-emerald-700"
                    }
                  >
                    {item.status || "available"}
                  </Chip>
                </div>
                <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 shadow-md">
                  <Heart className="h-4 w-4 fill-current text-white" />
                </div>
              </div>

              <div className="flex grow flex-col p-5">
                <h3 className="font-heading text-xl font-extrabold text-ink transition group-hover:text-primary dark:text-white">
                  {item.petName}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted dark:text-slate-400">
                  {item.breed}
                </p>

                <div className="mb-4 mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="font-black text-secondary">Tk {item.adoptionFee || 0}</p>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Button
                    as={Link}
                    to={`/pets/${item.petId}`}
                    className="rounded-full border border-primary bg-white font-bold text-primary hover:bg-primary hover:text-white dark:bg-slate-900"
                    variant="bordered"
                    size="sm"
                  >
                    <PawPrint className="h-4 w-4" /> View
                  </Button>
                  <Button
                    onClick={() => handleRemove(item.petId, item.petName)}
                    isLoading={removing === item.petId}
                    size="sm"
                    className="rounded-full bg-red-50 font-bold text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-950/30 dark:text-red-400"
                  >
                    {removing !== item.petId && <Trash2 className="h-4 w-4" />}
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
