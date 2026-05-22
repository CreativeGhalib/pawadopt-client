import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import { CalendarDays, Eye, PawPrint, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteConfirmModal from "../components/DeleteConfirmModal";


const StatusChip = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <Chip size="sm" className={`text-xs font-bold capitalize ${map[status] || map.pending}`}>
      {status}
    </Chip>
  );
};


const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // cancel confirm modal
  const [cancelModal, setCancelModal] = useState({
    open: false,
    request: null,
    deleting: false,
  });

  const axiosSecure = useAxiosSecure();


  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosSecure.get("/my-requests");
      setRequests(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load your requests.");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);


  const handleCancelConfirm = async () => {
    const req = cancelModal.request;
    if (!req) return;

    setCancelModal((prev) => ({ ...prev, deleting: true }));

    try {
      await axiosSecure.delete(`/adoption-requests/${req._id}`);
      setRequests((prev) => prev.filter((r) => r._id !== req._id));
      toast.success("Adoption request cancelled");
      setCancelModal({ open: false, request: null, deleting: false });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel request");
      setCancelModal((prev) => ({ ...prev, deleting: false }));
    }
  };


  return (
    <div>
      {/* page header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          My Requests
        </p>
        <h1 className="font-heading text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
          Your adoption requests
        </h1>
        <p className="mt-2 max-w-xl text-muted dark:text-slate-300">
          Track every adoption request you have submitted and cancel any that are still pending.
        </p>
      </div>

      {/* loading */}
      {loading && <LoadingSpinner />}

      {/* error */}
      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {/* empty */}
      {!loading && !error && requests.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-dashed border-outline bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <PawPrint className="mx-auto h-14 w-14 text-primary" />
          <h3 className="mt-4 font-heading text-2xl font-extrabold text-ink dark:text-white">
            No requests yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-muted dark:text-slate-300">
            Browse available pets and submit an adoption request to get started.
          </p>
          <Button
            as={Link}
            to="/pets"
            className="mt-6 rounded-full bg-primary px-8 font-bold text-white"
          >
            Browse Pets
          </Button>
        </motion.div>
      )}

      {/* desktop table */}
      {!loading && !error && requests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* --- table (md+) --- */}
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-outline shadow-sm dark:border-slate-800">
            <table className="min-w-full bg-white dark:bg-slate-900">
              <thead>
                <tr className="border-b border-outline bg-surface-low text-left text-xs font-bold uppercase tracking-widest text-muted dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  <th className="px-5 py-4">Pet</th>
                  <th className="px-5 py-4">Request Date</th>
                  <th className="px-5 py-4">Pickup Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline dark:divide-slate-800">
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className="transition hover:bg-surface-low dark:hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-bold text-ink dark:text-white">{req.petName}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {fmtDate(req.requestDate)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {fmtDate(req.pickupDate)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusChip status={req.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          as={Link}
                          to={`/pets/${req.petId}`}
                          size="sm"
                          variant="bordered"
                          className="rounded-xl border-outline font-semibold text-ink dark:border-slate-700 dark:text-slate-200"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                        {req.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setCancelModal({ open: true, request: req, deleting: false })
                            }
                            variant="flat"
                            className="rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- cards (mobile) --- */}
          <div className="grid gap-4 md:hidden">
            {requests.map((req) => (
              <div
                key={req._id}
                className="rounded-3xl border border-outline bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-lg font-extrabold text-ink dark:text-white">
                    {req.petName}
                  </h3>
                  <StatusChip status={req.status} />
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-muted dark:text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold">Requested:</span> {fmtDate(req.requestDate)}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold">Pickup:</span> {fmtDate(req.pickupDate)}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    as={Link}
                    to={`/pets/${req.petId}`}
                    size="sm"
                    variant="bordered"
                    className="flex-1 rounded-xl border-outline font-semibold text-ink dark:border-slate-700 dark:text-slate-200"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Pet
                  </Button>
                  {req.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        setCancelModal({ open: true, request: req, deleting: false })
                      }
                      variant="flat"
                      className="flex-1 rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* cancel confirm modal */}
      {cancelModal.open && (
        <DeleteConfirmModal
          petName={cancelModal.request?.petName}
          deleting={cancelModal.deleting}
          confirmLabel="Yes, Cancel Request"
          title="Cancel adoption request?"
          message={`Are you sure you want to cancel your adoption request for`}
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancelModal({ open: false, request: null, deleting: false })}
        />
      )}
    </div>
  );
};

export default MyRequests;
