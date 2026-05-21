const SectionHeader = ({ eyebrow, title, description, centered = false }) => {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-extrabold leading-tight text-ink dark:text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted dark:text-slate-300 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
