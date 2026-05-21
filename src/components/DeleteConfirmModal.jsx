import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({
  petName,
  deleting,
  onConfirm,
  onCancel,
  title = "Delete listing?",
  message = "Are you sure you want to remove",
  confirmLabel = "Delete",
}) => {
  // close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !deleting) onCancel();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="delete-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      >
        <motion.div
          key="delete-modal"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-md rounded-3xl border border-outline bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          {/* icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>

          {/* text */}
          <h2 className="font-heading text-2xl font-extrabold text-ink dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-muted dark:text-slate-300">
            {message}{" "}
            <span className="font-bold text-ink dark:text-white">{petName}</span>? This action
            cannot be undone.
          </p>

          {/* buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="bordered"
              isDisabled={deleting}
              onClick={onCancel}
              className="rounded-2xl border-outline font-bold text-muted"
            >
              Cancel
            </Button>
            <Button
              isLoading={deleting}
              onClick={onConfirm}
              className="rounded-2xl bg-red-500 font-bold text-white hover:bg-red-600"
            >
              {!deleting && <Trash2 className="h-4 w-4" />} {confirmLabel}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
