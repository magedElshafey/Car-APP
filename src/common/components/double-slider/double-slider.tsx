import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./double-slider.css";

interface DoubleSliderProps {
  min: number;
  max: number;
  step?: number;
  value: {
    min: number;
    max: number;
  };
  onChange: (value: { min: number; max: number }) => void;
  formatValue?: (value: number) => string;
}

const DoubleSlider: React.FC<DoubleSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (currentValue) => currentValue.toString(),
}) => {
  const { i18n } = useTranslation();
  const [internalValue, setInternalValue] = useState(value);
  const isInteractingRef = useRef(false);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (currentValue: number) =>
      Math.round(((currentValue - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (!isInteractingRef.current) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const minPercent = getPercent(internalValue.min);
    const maxPercent = getPercent(internalValue.max);

    if (range.current) {
      if (i18n.language === "ar") {
        range.current.style.right = `${minPercent}%`;
      } else {
        range.current.style.left = `${minPercent}%`;
      }

      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent, i18n.language, internalValue.max, internalValue.min]);

  const commitChange = useCallback(() => {
    isInteractingRef.current = false;
    onChange(internalValue);
  }, [internalValue, onChange]);

  return (
    <div>

    <div className="my-5 px-1">
      <div className="flex-center relative">
        <input
          type="range"
          min={min}
          max={max}
          value={internalValue.min}
          onMouseDown={() => {
            isInteractingRef.current = true;
          }}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onMouseUp={commitChange}
          onTouchEnd={commitChange}
          onBlur={commitChange}
          onKeyUp={commitChange}
          onChange={(event) => {
            const nextMin = Math.min(Number(event.target.value), internalValue.max);
            setInternalValue((old) => ({
              min: nextMin,
              max: old.max
            }));
          }}
          className={`thumb thumbLeft`}
          step={step}
          style={{ zIndex: internalValue.min >= max - step ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={internalValue.max}
          step={step}
          onMouseDown={() => {
            isInteractingRef.current = true;
          }}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onMouseUp={commitChange}
          onTouchEnd={commitChange}
          onBlur={commitChange}
          onKeyUp={commitChange}
          onChange={(event) => {
            const nextMax = Math.max(Number(event.target.value), internalValue.min);
            setInternalValue((old) => ({
              min: old.min,
              max: nextMax
            }));
          }}
          className={`thumb thumbRight`}
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
    </div>
      <div className="pt-5 flex items-center justify-between text-sm text-stone-500">
        <span>{formatValue(internalValue.min)}</span>
        <span>{formatValue(internalValue.max)}</span>
      </div>
    </div>
  );
};

export default memo(DoubleSlider);