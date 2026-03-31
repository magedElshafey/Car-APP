import { useState, useId, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import React from "react";

interface MainTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
  enableAutocomplete?: boolean;
  storageKey?: string;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const TextArea = React.forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      error,
      Icon,
      required = false,
      disabled = false,
      enableAutocomplete = false,
      storageKey,
      value,
      onChange,
      onBlur,
      rows = 4,
      resize = "vertical",
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const textareaId = id || autoId;

    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
      if (enableAutocomplete && storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      }
    }, [enableAutocomplete, storageKey]);

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (enableAutocomplete && storageKey && value) {
        const updated = Array.from(
          new Set([value as string, ...suggestions]),
        ).slice(0, 10);
        setSuggestions(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      if (onBlur) onBlur(e);
    };

    const resizeClasses = {
      none: "resize-none",
      both: "resize-none",
      horizontal: "resize-none",
      vertical: "resize-none",
    };

    return (
      <div className="w-full">
        {label && (
          <label
            tabIndex={-1}
            htmlFor={textareaId}
            className="block mb-2 text-sm font-medium text-text-muted md:text-base"
          >
            {t(label)}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div
          className={`transition duration-150 rounded-lg w-full py-3 px-4 flex items-start gap-3 bg-bg-surface border border-border-subtle
focus-within:ring-2 focus-within:ring-primary
text-text-main
placeholder:text-text-muted outline-none border-border bg-[#FFF1E5]
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "ring-2 ring-red-500" : ""}`}
        >
          {Icon && (
            <Icon
              size={20}
              className="flex-shrink-0 mt-1 text-text-gray"
              aria-hidden="true"
            />
          )}

          <textarea
            id={textareaId}
            tabIndex={0}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            className={`flex-1 outline-none w-full ring-border  bg-transparent  text-[#333333] placeholder:text-gray-400 ${resizeClasses[resize]} max-h-[300px] overflow-y-auto`}
            {...rest}
          />
        </div>

        {enableAutocomplete && (
          <datalist id={`${textareaId}-list`}>
            {suggestions.map((item, i) => (
              <option key={i} value={item} />
            ))}
          </datalist>
        )}

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <p
            id={`${textareaId}-error`}
            className="text-xs text-red-500"
            role="alert"
          >
            {error && t(error)}
          </p>
        </div>
      </div>
    );
  },
);

TextArea.displayName = "MainTextArea";

export default TextArea;
