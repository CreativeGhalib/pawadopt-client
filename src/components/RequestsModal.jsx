import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import { CalendarDays, Check, Loader2, PawPrint, Users, X, XCircle } from "lucide-react";
import toast from "react-hot-toast";

// ---------- status chip ----------

const RequestStatusChip = ({ status }) => {
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

// ---------- main component ----------

const RequestsModal = ({ pet, onClose, axiosSecure, onPetAdopted }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null); // id currently being approved/rejected

  // ---------- fetch requests ----------

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosSecure.get(`/pets/${pet._id}/requests`);
      setRequests(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load adoption requests.");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, pet._id]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ---------- approve / reject ----------

  const handleDecision = async (requestId, action) => {
    setActionId(requestId);
    try {
      await axiosSecure.patch(`/adoption-requests/${requestId}/${action}`);

      // update local state so UI reflects change immediately
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId
            ? { ...r, status: action === "approve" ? "approved" : "rejected" }
            : r
        )
      );

      // if approved, notify parent to update pet card status
      if (action === "approve" && onPetAdopted) {
        onPetAdopted(pet._id);
      }

      toast.success(action === "approve" ? "Request approved!" : "Request rejected.");
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${action} request`);
    } finally {
      setActionId(null);
    }
  };

  // ---------- close on backdrop click ----------

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // ---------- render ----------

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-outline bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-outline p-6 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-xl font-extrabold text-ink dark:text-white">
                  Adoption Requests
                </h2>
                <p className="text-sm text-muted dark:text-slate-400">
                  {pet.petName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition hover:bg-surface-low hover:text-ink dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* body */}
          <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 90px)" }}>
            {/* loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                {error}
              </div>
            )}

            {/* empty */}
            {!loading && !error && requests.length === 0 && (
              <div className="py-12 text-center">
                <PawPrint className="mx-auto h-12 w-12 text-primary/40" />
                <p className="mt-3 font-heading text-lg font-bold text-ink dark:text-white">
                  No requests yet
                </p>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">
                  No one has sent an adoption request for {pet.petName} yet.
                </p>
              </div>
            )}

            {/* request list */}
            {!loading && !error && requests.length > 0 && (
              <div className="flex flex-col gap-4">
                {requests.map((req) => (
                  <RequestRow
                    key={req._id}
                    request={req}
                    isActing={actionId === req._id}
                    onDecision={handleDecision}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ---------- request row ----------

const RequestRow = ({ request, isActing, onDecision }) => {
  const { _id, requesterName, requesterEmail, pickupDate, status } = request;
  const isPending = status === "pending";

  return (
    <div className="rounded-2xl border border-outline bg-surface p-4 dark:border-slate-800 dark:bg-slate-950">
      {/* requester info */}
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-ink dark:text-white">
            {requesterName || "—"}
          </p>
          <p className="text-sm text-muted dark:text-slate-400">{requesterEmail}</p>
        </div>
        <RequestStatusChip status={status} />
      </div>

      {/* pickup date */}
      <p className="mb-3 flex items-center gap-1.5 text-sm text-muted dark:text-slate-400">
        <CalendarDays className="h-4 w-4 text-primary" />
        Pickup: {pickupDate ? new Date(pickupDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
      </p>

      {/* approve / reject buttons — only for pending */}
      {isPending && (
        <div className="flex gap-2">
          <Button
            size="sm"
            isLoading={isActing}
            onClick={() => onDecision(_id, "approve")}
            className="rounded-xl bg-emerald-500 font-bold text-white hover:bg-emerald-600"
          >
            {!isActing && <Check className="h-4 w-4" />} Approve
          </Button>
          <Button
            size="sm"
            isLoading={isActing}
            onClick={() => onDecision(_id, "reject")}
            className="rounded-xl bg-red-50 font-bold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400"
            variant="flat"
          >
            {!isActing && <XCircle className="h-4 w-4" />} Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestsModal;
