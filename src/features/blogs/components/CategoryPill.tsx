const CategoryPill: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="
      inline-flex items-center gap-1
      rounded-full 
      text-[11px] font-semibold tracking-[0.16em] uppercase
      bg-[color:var(--section-chip-bg)]
      text-[color:var(--section-chip-text)]
    "
  >
    <span
      className="h-1.5 w-1.5 rounded-full bg-[color:var(--section-chip-dot)]"
      aria-hidden="true"
    />
    {label}
  </span>
);

export default CategoryPill;
