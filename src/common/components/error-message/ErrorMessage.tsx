import { useTranslation } from "react-i18next";
type ErrorMessageProps = {
  message?: string;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "An error occurred while retrieving data.",
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center w-full h-full my-3 text-danger">
      <p className="text-center">{t(message)}</p>
    </div>
  );
};

export default ErrorMessage;
