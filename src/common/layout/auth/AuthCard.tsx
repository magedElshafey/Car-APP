// AuthCard.tsx
import { useTranslation } from "react-i18next";

interface AuthCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <main
      role="main"
      className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8"
    >
      {title && (
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-primary">{t(title)}</h1>
          {description && (
            <p className="mt-2 text-sm text-text">{t(description)}</p>
          )}
        </header>
      )}

      <section aria-label={title || "Authentication form"}>{children}</section>
    </main>
  );
};

export default AuthCard;
