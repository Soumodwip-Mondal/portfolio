import * as React from "react";
import { cn } from "../../lib/utils";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value, defaultValue, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      onChange?.(newValue);
    };

    return (
      <div className={cn("relative w-full touch-none select-none", className)}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="absolute h-full bg-slate-900 dark:bg-slate-400"
            style={{
              width: `${((value ?? defaultValue ?? min) / max) * 100}%`,
            }}
          />
        </div>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          disabled={props.disabled}
          id={props.id}
          name={props.name}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider }; 