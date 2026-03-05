import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <main
      className="
        relative min-h-screen overflow-hidden
        flex items-center justify-center
        bg-bg-page
      "
      role="main"
      aria-labelledby="not-found-title"
    >
      {/* Animated background */}
      <div aria-hidden="true" className="absolute inset-0 animated-bg" />

      {/* Content */}
      <section
        className="
          relative z-10
          max-w-md w-full mx-4
          rounded-card
          bg-bg-surface
          border border-border-subtle
          shadow-soft
          p-8 text-center
          animate-float
        "
      >
        <span className="block text-6xl font-extrabold text-primary">404</span>

        <h1
          id="not-found-title"
          className="mt-3 text-xl font-bold text-text-main"
        >
          Page not found
        </h1>

        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            mt-6
            rounded-pill
            bg-primary
            px-6 py-3
            text-sm font-semibold text-white
            transition
            hover:bg-primary-dark
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
          "
        >
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
