import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import Loader from "../loader/spinner/Loader";
import type { IconType } from "react-icons";

interface OptionType {
  id: number | string;
  name: string;
}

interface MainSelectProps<T extends OptionType> {
  id?: string;
  name?: string; // optional for forms
  options?: T[];
  onSelect?: (option: T) => void; // full option callback
  onChange?: (value: number | null | string) => void; // controlled value callback (id)
  onBlur?: (e?: any) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  fetchApi?: () => Promise<T[]>;
  value?: number | string | null; // controlled value is option.id or null
  error?: string | null;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
  Icon?: IconType;
  label?: string;
}

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const MainSelectInner = <T extends OptionType>(props: MainSelectProps<T>) => {
  const {
    id,
    options = [],
    onSelect,
    onChange,
    onBlur,
    disabled = false,
    loading = false,
    placeholder,
    fetchApi,
    value,
    error,
    required = false,
    className,
    Icon,
    label = "",
  } = props;

  const { t, i18n } = useTranslation();
  const autoId = useId();
  const inputId = id || `${autoId}-select`;
  const listboxId = `${inputId}-listbox`;
  const errorId = `${inputId}-error`;

  const [showOptions, setShowOptions] = useState(false);
  const [fetchedOptions, setFetchedOptions] = useState<T[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>("");
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const lastSelectedRef = useRef<T | undefined>(undefined);

  // decide displayed options (fetched or from props)
  const displayedOptions = fetchApi ? fetchedOptions : options;

  // load fetched options lazily when opening
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (fetchApi && fetchedOptions.length === 0) {
        try {
          const data = await fetchApi();
          if (mounted) setFetchedOptions(data);
        } catch (err) {
          console.error("MainSelect fetchApi error:", err);
        }
      }
    };
    if (showOptions) load();
    return () => {
      mounted = false;
    };
  }, [showOptions, fetchApi, fetchedOptions.length]);

  // sync selected label when value or options change
  useEffect(() => {
    if (value != null) {
      const opt =
        options.find((o) => o.id === value) ||
        fetchedOptions.find((o) => o.id === value);
      if (opt) {
        setSelectedLabel(opt.name);
        lastSelectedRef.current = opt;
      } else {
        setSelectedLabel(null);
      }
    } else {
      setSelectedLabel(null);
      lastSelectedRef.current = undefined;
    }
  }, [value, options, fetchedOptions]);

  useClickOutside(containerRef, () => {
    setShowOptions(false);
    setFocusedIndex(-1);
  });

  const filtered = displayedOptions?.filter((o) =>
    o?.name?.toLowerCase().includes(search?.toLowerCase()),
  );

  // keyboard handling
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!showOptions) {
          openList();
        } else {
          setFocusedIndex((prev) =>
            Math.min(prev + 1, Math.max(0, filtered.length - 1)),
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (showOptions) {
          setFocusedIndex((prev) => Math.max(0, prev - 1));
        }
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(filtered.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (
          showOptions &&
          focusedIndex >= 0 &&
          focusedIndex < filtered.length
        ) {
          handleSelectChange(filtered[focusedIndex]);
        } else {
          openList();
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowOptions(false);
        setSearch("");
        break;
      default:
        // allow typing to search
        if (!showOptions) {
          openList();
        }
        break;
    }
  };

  const openList = () => {
    if (disabled) return;
    setShowOptions(true);
    // focus input after opening
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleToggle = (e?: React.MouseEvent) => {
    if (disabled) return;
    e?.stopPropagation();
    setShowOptions((s) => {
      const next = !s;
      if (next) {
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        setFocusedIndex(-1);
      }
      return next;
    });
  };

  const handleSelectChange = (option: T) => {
    setSelectedLabel(option.name);
    lastSelectedRef.current = option;
    setShowOptions(false);
    setSearch("");
    setFocusedIndex(-1);
    if (onSelect) onSelect(option);
    if (onChange) onChange(option.id);
    if (onBlur) onBlur(); // inform forms that blur/commit happened
  };

  // move focus to the focusedIndex item visually (scrollIntoView)
  useEffect(() => {
    if (focusedIndex < 0) return;
    const listEl = listRef.current;
    const item = listEl?.querySelector(`[data-index="${focusedIndex}"]`) as
      | HTMLElement
      | undefined;
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  const showLabel = selectedLabel
    ? t(selectedLabel)
    : placeholder
      ? t(placeholder)
      : "";

  return (
    <div className={`w-full ${className || ""}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-700 md:text-base"
        >
          {t(label)}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        ref={containerRef}
        className={`relative w-full`}
        onClick={(e) => {
          // open when clicking the box (unless clicking inside list)
          if ((e.target as Node) === containerRef.current) openList();
        }}
      >
        <div
          role="combobox"
          aria-expanded={showOptions}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          tabIndex={0}
          onKeyDown={(e) => {
            // convert React.KeyboardEvent to our handler
            handleKeyDown(e as any);
          }}
          onBlur={() => {
            // note: actual blur handling to forms will be called on select or explicitly if needed
          }}
          className={`transition text-text-gray duration-150 w-full rounded-pill px-4 py-2.5 pr-4 flex items-center justify-between gap-3 bg-bg-surface
          border border-slate-300
focus-within:ring-2 focus-within:ring-primary
text-text-main
placeholder:text-text-muted
shadow-soft
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${error ? "ring-2 ring-red-500" : ""}`}
          onClick={handleToggle}
        >
          {/* leading placeholder / selected text */}
          <div className="flex items-center min-w-0 gap-2">
            {Icon && <Icon size={20} aria-hidden="true" />}
            <span className="truncate">{showLabel}</span>
          </div>

          {/* chevron */}
          {!disabled && (
            <FiChevronDown
              size={18}
              aria-hidden="true"
              className="self-center shrink-0"
            />
          )}
        </div>

        {/* dropdown */}
        {showOptions && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={inputId}
            ref={listRef}
            className={`absolute top-full  w-full max-h-48 overflow-y-auto bg-white border border-slate-400 rounded-2xl shadow-lg z-30 ${
              i18n.language === "ar" ? "right-0" : "left-0"
            }`}
          >
            <div className="sticky top-0 z-10 p-2 bg-white border-b border-slate-200">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setFocusedIndex(0);
                }}
                onKeyDown={(e) => handleKeyDown(e as any)}
                placeholder={t("Search...")}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-primary"
              />
            </div>

            {loading ? (
              <div className="flex justify-center w-full py-3">
                <Loader />
              </div>
            ) : filtered.length ? (
              filtered.map((item, idx) => {
                const isFocused = idx === focusedIndex;
                const isSelected = lastSelectedRef.current?.id === item.id;
                return (
                  <div
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    key={item.id}
                    data-index={idx}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    onMouseDown={(e) => {
                      // prevent blur before click handler
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectChange(item);
                    }}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      isFocused ? "bg-gray-100" : ""
                    }`}
                  >
                    {t(item.name)}
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full p-3 flex-center">
                <p className="text-center">{t("no data")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* error area (same as MainInput) */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <p id={errorId} className="text-xs text-red-500" role="alert">
          {error && t(error)}
        </p>
      </div>
    </div>
  );
};

const MainSelect = React.forwardRef(MainSelectInner) as <T extends OptionType>(
  p: MainSelectProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export default MainSelect;
