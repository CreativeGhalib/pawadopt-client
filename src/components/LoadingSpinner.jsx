const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="text-sm font-semibold text-muted dark:text-slate-300">Loading PawAdopt...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
