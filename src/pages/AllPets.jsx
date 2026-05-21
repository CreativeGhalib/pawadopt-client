import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Filter, PawPrint, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import LoadingSpinner from "../components/LoadingSpinner";
import PetCard from "../components/PetCard";
import SectionHeader from "../components/SectionHeader";
import useAuth from "../hooks/useAuth";

const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Fee Low to High", value: "fee-asc" },
  { label: "Fee High to Low", value: "fee-desc" },
  { label: "Name A to Z", value: "name-asc" },
];

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (species !== "all") {
      params.set("species", species);
    }

    if (sort !== "newest") {
      params.set("sort", sort);
    }

    return params.toString();
  }, [search, species, sort]);

  useEffect(() => {
    const controller = new AbortController();

    const loadPets = async () => {
      setLoading(true);
      setError("");

      try {
        const endpoint = queryParams ? `/pets?${queryParams}` : "/pets";
        const { data } = await axiosPublic.get(endpoint, {
          signal: controller.signal,
        });
        setPets(data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || "Pets could not be loaded right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadPets, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [queryParams]);

  const handleAdoptNow = (pet) => {
    const target = `/pets/${pet._id}`;

    if (!user) {
      toast.error("Please login before sending an adoption request");
      navigate("/login", { state: { from: { pathname: target } } });
      return;
    }

    navigate(target);
  };

  const resetFilters = () => {
    setSearch("");
    setSpecies("all");
    setSort("newest");
  };

  return (
    <div className="bg-surface dark:bg-slate-950">
      <section className="border-b border-outline bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="container-width grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <SectionHeader
            eyebrow="All Pets"
            title="Browse adoptable pets across Bangladesh"
            description="Search by name, narrow by species, and sort the listings to find a pet that fits your home."
          />

          <div className="rounded-3xl border border-outline bg-surface-low p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                <PawPrint className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-ink dark:text-white">{pets.length}</p>
                <p className="text-sm font-semibold text-muted dark:text-slate-300">pets currently shown</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-width py-10">
        <div className="mb-8 rounded-[2rem] border border-outline bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <Search className="h-4 w-4 text-primary" /> Search by name
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pets by name"
                className="focus-glow w-full rounded-2xl border border-outline bg-surface px-4 py-3 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <Filter className="h-4 w-4 text-primary" /> Species
              </span>
              <select
                value={species}
                onChange={(event) => setSpecies(event.target.value)}
                className="focus-glow w-full rounded-2xl border border-outline bg-surface px-4 py-3 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="all">All Species</option>
                {speciesOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Sort
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="focus-glow w-full rounded-2xl border border-outline bg-surface px-4 py-3 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950"
              >
                {sortOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <Button
              onClick={resetFilters}
              variant="bordered"
              className="h-12 rounded-2xl border-outline font-bold text-muted dark:border-slate-700 dark:text-slate-200"
            >
              <X className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && pets.length === 0 && (
          <div className="rounded-3xl border border-dashed border-outline bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <PawPrint className="mx-auto h-14 w-14 text-primary" />
            <h3 className="mt-4 font-heading text-2xl font-extrabold text-ink dark:text-white">
              No pets matched your search
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-muted dark:text-slate-300">
              Try a different name, choose another species, or reset filters to see all available pets.
            </p>
            <Button onClick={resetFilters} className="mt-6 rounded-full bg-primary px-7 font-bold text-white">
              Reset Filters
            </Button>
          </div>
        )}

        {!loading && !error && pets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} showAdopt onAdopt={handleAdoptNow} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default AllPets;
