import { useState, useId, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React from "react";

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
  enableAutocomplete?: boolean;
  storageKey?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, MainInputProps>(
  (
    {
      id,
      label,
      placeholder,
      type = "text",
      error,
      Icon,
      required = false,
      disabled = false,
      enableAutocomplete = false,
      storageKey,
      value,
      onChange,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const inputId = id || autoId;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
      if (enableAutocomplete && storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      }
    }, [enableAutocomplete, storageKey]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (enableAutocomplete && storageKey && value) {
        const updated = Array.from(
          new Set([value as string, ...suggestions]),
        ).slice(0, 10);
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      if (onBlur) onBlur(e);
    };

    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
      <div className="w-full">
        {label && (
          <label
            tabIndex={-1}
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium md:text-base text-text-muted"
          >
            {t(label)}
            {required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}

        <div
          className={`transition bg-[#FFF1E5] duration-150  w-full rounded  py-2.5 px-4 flex items-center gap-3
border border-border
focus-within:ring-2 focus-within:ring-primary
text-text
placeholder:text-muted
shadow-sm
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "ring-2 ring-danger" : ""}`}
        >
          {Icon && <Icon size={20} className="text-muted" aria-hidden="true" />}

          <input
            id={inputId}
            tabIndex={0}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            list={enableAutocomplete ? `${inputId}-list` : undefined}
            className="flex-1 w-full bg-transparent border-none outline-none text-text placeholder:text-muted"
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={togglePassword}
              aria-label={
                showPassword ? t("hide password") : t("show password")
              }
              className="text-muted focus:outline-none"
            >
              {showPassword ? (
                <FiEyeOff className="text-muted" size={20} />
              ) : (
                <FiEye size={20} className="text-muted" />
              )}
            </button>
          )}
        </div>

        {enableAutocomplete && (
          <datalist id={`${inputId}-list`}>
            {suggestions.map((item, i) => (
              <option key={i} value={item} />
            ))}
          </datalist>
        )}

        <div
          className={`transition-all duration-100   mt-1 min-h-1 overflow-hidden ${
            error ? "opacity-100" : " opacity-0"
          }`}
        >
          <p
            id={`${inputId}-error`}
            className="text-xs text-danger"
            role="alert"
          >
            {error && t(error)}
          </p>
        </div>
      </div>
    );
  },
);

export default TextInput;
