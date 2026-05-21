import { motion } from "framer-motion";

const FoundationPage = ({ title, compact = false }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={compact ? "" : "container-width py-16"}
    >
      <div className="rounded-3xl border border-outline bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Phase 3 Foundation</p>
        <h1 className="font-heading text-3xl font-extrabold text-ink dark:text-white md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted dark:text-slate-300">
          Routing, layout, authentication shell, cookie-ready axios, and theme foundation are ready.
          This page will be built in the feature page phase.
        </p>
      </div>
    </motion.section>
  );
};

export default FoundationPage;
