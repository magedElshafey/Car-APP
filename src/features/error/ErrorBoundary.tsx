import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isRouteError = isRouteErrorResponse(error);

  const title = isRouteError ? `${error.status}` : t("Something went wrong");

  const description = isRouteError
    ? error.data?.message || error.statusText
    : (error as Error)?.message || t("An unexpected error occurred.");

  return (
    <main
      role="main"
      aria-labelledby="error-title"
      className="
        relative min-h-screen overflow-hidden
        flex items-center justify-center
        bg-bg-page
      "
    >
      {/* Animated background */}
      <div aria-hidden="true" className="absolute inset-0 error-animated-bg" />

      {/* Content Card */}
      <section
        className="
          relative z-10
          w-full max-w-lg mx-4
          rounded-card
          bg-bg-surface
          border border-border-subtle
          shadow-soft
          p-8 md:p-10
          text-center
        "
      >
        {/* Error Code */}
        <span className="block text-6xl font-extrabold text-primary">
          {title}
        </span>

        <h1 id="error-title" className="mt-4 text-xl font-bold text-text-main">
          {t("Oops!")}
        </h1>

        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(0)}
            className="
              inline-flex items-center justify-center
              rounded-pill
              border border-border-subtle
              px-5 py-2.5
              text-sm font-semibold text-text-main
              hover:bg-bg-alt
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
            "
          >
            {t("Retry")}
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              inline-flex items-center justify-center
              rounded-pill
              bg-primary
              px-5 py-2.5
              text-sm font-semibold text-white
              transition
              hover:bg-primary-dark
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
            "
          >
            {t("Go to home")}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ErrorBoundary;
