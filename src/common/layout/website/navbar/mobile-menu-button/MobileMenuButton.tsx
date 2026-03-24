// type MobileMenuButtonProps = {
//   isOpen: boolean;
//   onToggle: () => void;
// };

// const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
//   isOpen,
//   onToggle,
// }) => {
//   return (
//     <button
//       type="button"
//       onClick={onToggle}
//       aria-label={isOpen ? "Close main menu" : "Open main menu"}
//       aria-expanded={isOpen}
//       aria-controls="primary-mobile-nav"
//       className="inline-flex items-center justify-center p-2 border  // rounded-pill border-border-subtle bg-bg-surface text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
//     >
//       <span className="sr-only">Toggle navigation</span>
//       <div className="relative w-4 h-4" aria-hidden="true">
//         {/* 3 lines تتحول لـ X */}
//         <span
//           className={`
//             absolute left-0 top-[2px] h-[2px] w-full rounded-full bg-text-main
//             transition-transform transition-opacity
//             ${isOpen ? "translate-y-2 rotate-45" : ""}
//           `}
//         />
//         <span
//           className={`
//             absolute left-0 top-[8px] h-[2px] w-full rounded-full bg-text-main
//             transition-opacity
//             ${isOpen ? "opacity-0" : "opacity-100"}
//           `}
//         />
//         <span
//           className={`
//             absolute left-0 top-[14px] h-[2px] w-full rounded-full bg-text-main
//             transition-transform transition-opacity
//             ${isOpen ? "-translate-y-2 -rotate-45" : ""}
//           `}
//         />
//       </div>
//     </button>
//   );
// };
// export default MobileMenuButton;
type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onToggle,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close main menu" : "Open main menu"}
      className="inline-flex items-center justify-center w-10 h-10 transition border rounded-full border-border-subtle bg-bg-surface text-text-main hover:bg-bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
      {...props}
    >
      <span className="sr-only">Toggle navigation</span>

      <div className="relative w-4 h-4" aria-hidden="true">
        <span
          className={[
            "absolute left-0 top-[2px] h-[2px] w-full rounded-full bg-current transition-all duration-300",
            isOpen ? "translate-y-[6px] rotate-45" : "",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 top-[7px] h-[2px] w-full rounded-full bg-current transition-all duration-300",
            isOpen ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current transition-all duration-300",
            isOpen ? "-translate-y-[4px] -rotate-45" : "",
          ].join(" ")}
        />
      </div>
    </button>
  );
};

export default MobileMenuButton;
