import { Link } from "react-router-dom";

export interface LogoProps {
  src?: string;
  hasScale?: boolean;
}

const Logo: React.FC<LogoProps> = ({ src, hasScale = false }) => {
  return (
    <Link
      to="/"
      aria-label="Wise Follow Up home"
      className="flex items-center shrink-0"
    >
      <div className="flex items-center h-14">
        {!src ? (
          // Skeleton
          <div className="w-32 bg-gray-200 rounded-md h-14 animate-pulse" />
        ) : (
          <img
            src={src}
            alt="Wise Follow Up logo"
            className={`object-contain w-auto h-full lg:ms-[-11px] ${hasScale ? "lg:scale-[1.3]" : ""}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
