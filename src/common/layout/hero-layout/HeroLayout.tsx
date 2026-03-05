import { FC, ReactNode } from "react";

type HeroLayoutProps = {
  children: ReactNode;
  /**
   * Minimum height of hero section
   * Example:
   * "min-h-[60vh] lg:min-h-[80vh]"
   */
  minHeight?: string;
};

const HeroLayout: FC<HeroLayoutProps> = ({
  children,
  minHeight = "min-h-[60vh]",
}) => {
  return (
    <section
      role="banner"
      className={`
        relative
        ${minHeight}
  /* 🔥 prevent horizontal overflow */
    overflow-x-hidden
        /* layout */
        flex
        items-center

        /* spacing */
        py-16 sm:py-20 lg:py-24

        /* background */
        bg-gradient-to-b
        from-primary/20
        via-primary/10
        to-bg-page
      `}
    >
      {/* =====================
          Ambient background blobs
          (isolated overflow)
         ===================== */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        <span
          className="
            absolute -top-40 -right-40
            h-[32rem] w-[32rem]
            rounded-full
            bg-primary/20
            blur-[120px]
          "
        />

        <span
          className="
            absolute -bottom-40 -left-40
            h-[32rem] w-[32rem]
            rounded-full
            bg-accent/20
            blur-[120px]
          "
        />
      </div>

      {/* =====================
          Content
         ===================== */}
      <div className="relative z-10 w-full">
        <div className="containerr">{children}</div>
      </div>
    </section>
  );
};

export default HeroLayout;
