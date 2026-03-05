type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close main menu" : "Open main menu"}
      aria-expanded={isOpen}
      aria-controls="primary-mobile-nav"
      className="
        inline-flex items-center justify-center
        rounded-pill border border-border-subtle
        bg-bg-surface p-2
        text-text-main
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
      "
    >
      <span className="sr-only">Toggle navigation</span>
      <div className="relative h-4 w-4" aria-hidden="true">
        {/* 3 lines تتحول لـ X */}
        <span
          className={`
            absolute left-0 top-[2px] h-[2px] w-full rounded-full bg-text-main
            transition-transform transition-opacity
            ${isOpen ? "translate-y-2 rotate-45" : ""}
          `}
        />
        <span
          className={`
            absolute left-0 top-[8px] h-[2px] w-full rounded-full bg-text-main
            transition-opacity
            ${isOpen ? "opacity-0" : "opacity-100"}
          `}
        />
        <span
          className={`
            absolute left-0 top-[14px] h-[2px] w-full rounded-full bg-text-main
            transition-transform transition-opacity
            ${isOpen ? "-translate-y-2 -rotate-45" : ""}
          `}
        />
      </div>
    </button>
  );
};
export default MobileMenuButton;
