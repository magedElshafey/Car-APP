const ClosingStatementSkeleton = () => {
  return (
    <section
      aria-hidden
      className="bg-gradient-to-br from-primary-soft via-bg-alt to-bg-surface py-section-y"
    >
      <div className="mx-auto max-w-4xl px-6 text-center animate-pulse">
        {/* Heading */}
        <div className="h-8 w-3/4 mx-auto rounded bg-border-subtle" />

        {/* Description */}
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-border-subtle" />
          <div className="h-4 w-5/6 mx-auto rounded bg-border-subtle" />
          <div className="h-4 w-4/6 mx-auto rounded bg-border-subtle" />
        </div>
      </div>
    </section>
  );
};

export default ClosingStatementSkeleton;
