import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeDollarSign, Eye, PawPrint, Pencil, Plus, Trash2, Users } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import RequestsModal from "../components/RequestsModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import EditPetModal from "../components/EditPetModal";

// ---------- small helper components ----------

const StatCard = ({ label, value, accent }) => (
  <div className="rounded-2xl border border-outline bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <p className={`font-heading text-3xl font-extrabold ${accent}`}>{value}</p>
    <p className="mt-1 text-sm font-semibold text-muted dark:text-slate-300">{label}</p>
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

// ---------- main component ----------

const MyListings = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // requests modal state
  const [requestsModal, setRequestsModal] = useState({ open: false, pet: null });

  // delete confirm modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, pet: null, deleting: false });

  // edit modal state
  const [editModal, setEditModal] = useState({ open: false, pet: null });

  const axiosSecure = useAxiosSecure();

  // ---------- fetch owner pets ----------

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosSecure.get("/my-listings");
      setPets(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load your listings.");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // ---------- derived stats ----------

  const totalListings = pets.length;
  const availableCount = pets.filter((p) => p.status !== "adopted").length;
  const adoptedCount = pets.filter((p) => p.status === "adopted").length;

  // ---------- delete pet ----------

  const handleDeleteConfirm = async () => {
    const pet = deleteModal.pet;
    if (!pet) return;

    setDeleteModal((prev) => ({ ...prev, deleting: true }));

    try {
      await axiosSecure.delete(`/pets/${pet._id}`);
      setPets((prev) => prev.filter((p) => p._id !== pet._id));
      toast.success(`${pet.petName} removed from your listings`);
      setDeleteModal({ open: false, pet: null, deleting: false });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete pet");
      setDeleteModal((prev) => ({ ...prev, deleting: false }));
    }
  };

  // ---------- open requests modal ----------

  const openRequestsModal = (pet) => setRequestsModal({ open: true, pet });
  const closeRequestsModal = () => setRequestsModal({ open: false, pet: null });

  // when owner approves a request, mark that pet as adopted in local state
  const handlePetAdopted = (petId) => {
    setPets((prev) =>
      prev.map((p) => (p._id === petId ? { ...p, status: "adopted" } : p))
    );
  };

  // ---------- edit pet callbacks ----------

  const openEditModal = (pet) => setEditModal({ open: true, pet });
  const closeEditModal = () => setEditModal({ open: false, pet: null });

  const handlePetUpdated = (updatedPet) => {
    setPets((prev) => prev.map((p) => (p._id === updatedPet._id ? updatedPet : p)));
    closeEditModal();
  };

  // ---------- render ----------

  return (
    <div>
      {/* page header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">My Listings</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
              Your pet listings
            </h1>
            <p className="mt-2 max-w-xl text-muted dark:text-slate-300">
              Manage the pets you have listed for adoption, review requests, and track approvals.
            </p>
          </div>
          <Button
            as={Link}
            to="/dashboard/add-pet"
            className="shrink-0 rounded-2xl bg-primary px-6 font-bold text-white"
          >
            <Plus className="h-4 w-4" /> Add New Pet
          </Button>
        </div>
      </div>

      {/* stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Listings" value={totalListings} accent="text-ink dark:text-white" />
        <StatCard label="Available Pets" value={availableCount} accent="text-emerald-600" />
        <StatCard label="Adopted Pets" value={adoptedCount} accent="text-amber-600" />
      </div>

      {/* loading */}
      {loading && <LoadingSpinner />}

      {/* error */}
      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {/* empty state */}
      {!loading && !error && pets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-dashed border-outline bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <PawPrint className="mx-auto h-14 w-14 text-primary" />
          <h3 className="mt-4 font-heading text-2xl font-extrabold text-ink dark:text-white">
            No pets listed yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-muted dark:text-slate-300">
            Add your first pet listing to start receiving adoption requests.
          </p>
          <Button
            as={Link}
            to="/dashboard/add-pet"
            className="mt-6 rounded-full bg-primary px-8 font-bold text-white"
          >
            <Plus className="h-4 w-4" /> Add a Pet
          </Button>
        </motion.div>
      )}

      {/* pet cards grid */}
      {!loading && !error && pets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {pets.map((pet) => (
            <ListingCard
              key={pet._id}
              pet={pet}
              onViewRequests={openRequestsModal}
              onEdit={openEditModal}
              onDelete={(p) => setDeleteModal({ open: true, pet: p, deleting: false })}
            />
          ))}
        </motion.div>
      )}

      {/* requests modal */}
      {requestsModal.open && (
        <RequestsModal
          pet={requestsModal.pet}
          onClose={closeRequestsModal}
          axiosSecure={axiosSecure}
          onPetAdopted={handlePetAdopted}
        />
      )}

      {/* edit modal */}
      {editModal.open && editModal.pet && (
        <EditPetModal
          pet={editModal.pet}
          onClose={closeEditModal}
          onUpdated={handlePetUpdated}
          axiosSecure={axiosSecure}
        />
      )}

      {/* delete confirm modal */}
      {deleteModal.open && (
        <DeleteConfirmModal
          petName={deleteModal.pet?.petName}
          deleting={deleteModal.deleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ open: false, pet: null, deleting: false })}
        />
      )}
    </div>
  );
};

// ---------- listing card ----------

const ListingCard = ({ pet, onViewRequests, onEdit, onDelete }) => {
  const { _id, petName, imageUrl, adoptionFee, status, species, breed } = pet;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-outline bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      {/* image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-low">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=900"}
          alt={petName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusChip status={status} />
        </div>
      </div>

      {/* info */}
      <div className="flex grow flex-col p-4">
        <div className="mb-3">
          <h3 className="font-heading text-lg font-extrabold text-ink dark:text-white">{petName}</h3>
          <p className="mt-0.5 text-sm text-muted dark:text-slate-400">
            {species}
            {breed ? ` · ${breed}` : ""}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-secondary">
          <BadgeDollarSign className="h-4 w-4" />
          Tk {adoptionFee ?? 0} adoption fee
        </div>

        {/* action buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button
            size="sm"
            onClick={() => onViewRequests(pet)}
            className="col-span-2 rounded-xl bg-primary font-bold text-white"
          >
            <Users className="h-4 w-4" /> Requests
          </Button>

          <Button
            as={Link}
            to={`/pets/${_id}`}
            size="sm"
            variant="bordered"
            className="rounded-xl border-outline font-semibold text-ink dark:border-slate-700 dark:text-slate-200"
          >
            <Eye className="h-4 w-4" /> View
          </Button>

          <Button
            size="sm"
            variant="bordered"
            onClick={() => onEdit(pet)}
            className="rounded-xl border-outline font-semibold text-ink dark:border-slate-700 dark:text-slate-200"
          >
            <Pencil className="h-4 w-4" /> Edit
          </Button>

          <Button
            size="sm"
            onClick={() => onDelete(pet)}
            className="col-span-2 rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400"
            variant="flat"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </div>
      </div>
    </article>
  );
};

export default MyListings;
