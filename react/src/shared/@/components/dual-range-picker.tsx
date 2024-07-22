import React, { useState, useCallback, useEffect, useRef, forwardRef } from "react";

interface DualRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  onChange: (values: [number, number]) => void;
  debounceTime?: number;
}

const DualRangePicker = forwardRef<HTMLDivElement, DualRangePickerProps>(
  ({ min = 0, max = 100, step = 1, onChange, debounceTime = 200, className = "", style = {}, ...props }, ref) => {
    const [leftValue, setLeftValue] = useState<number>(min);
    const [rightValue, setRightValue] = useState<number>(max);
    const [activeHandle, setActiveHandle] = useState<"left" | "right" | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const calculateValue = useCallback(
      (clientX: number): number => {
        if (!sliderRef.current) return min;
        const { left, width } = sliderRef.current.getBoundingClientRect();
        const percentage = Math.min(Math.max((clientX - left) / width, 0), 1);
        return Math.round((percentage * (max - min)) / step) * step + min;
      },
      [min, max, step]
    );

    const handleMouseDown = useCallback((e: React.MouseEvent, handle: "left" | "right") => {
      e.preventDefault();
      setActiveHandle(handle);
    }, []);

    const debouncedOnChange = useCallback(
      (newValues: [number, number]) => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          onChange(newValues);
        }, debounceTime);
      },
      [onChange, debounceTime]
    );

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!activeHandle) return;

        const newValue = calculateValue(e.clientX);

        if (activeHandle === "left") {
          setLeftValue(newValue);
        } else {
          setRightValue(newValue);
        }

        const newValues: [number, number] = [
          Math.min(activeHandle === "left" ? newValue : leftValue, activeHandle === "right" ? newValue : rightValue),
          Math.max(activeHandle === "left" ? newValue : leftValue, activeHandle === "right" ? newValue : rightValue),
        ];

        debouncedOnChange(newValues);
      },
      [activeHandle, calculateValue, debouncedOnChange, leftValue, rightValue]
    );

    useEffect(() => {
      const handleMouseUp = () => {
        setActiveHandle(null);
      };

      if (activeHandle) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [activeHandle, handleMouseMove]);

    const leftPercentage = ((leftValue - min) / (max - min)) * 100;
    const rightPercentage = ((rightValue - min) / (max - min)) * 100;

    return (
      <div ref={ref} className={`w-full max-w-sm px-2 py-4 ${className}`} style={style} {...props}>
        <div ref={sliderRef} className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${Math.min(leftPercentage, rightPercentage)}%`,
              right: `${100 - Math.max(leftPercentage, rightPercentage)}%`,
            }}
          />
          <div
            className="absolute w-6 h-6 -mt-2 -ml-3 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing"
            style={{ left: `${leftPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, "left")}
          />
          <div
            className="absolute w-6 h-6 -mt-2 -ml-3 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing"
            style={{ left: `${rightPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, "right")}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{Math.min(leftValue, rightValue)}</span>
          <span>{Math.max(leftValue, rightValue)}</span>
        </div>
      </div>
    );
  }
);

export default DualRangePicker;
