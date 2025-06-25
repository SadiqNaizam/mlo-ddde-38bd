import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AllowanceSliderProps {
  /** The main label for the slider, e.g., "Weekly Allowance" */
  label: string;
  /** The initial value of the slider */
  defaultValue?: number;
  /** The maximum possible value */
  max?: number;
  /** The increment step of the slider */
  step?: number;
  /** Callback function that receives the new value when the slider is adjusted */
  onValueChange?: (value: number) => void;
  /** The currency symbol to display, defaults to '£' */
  currencySymbol?: string;
  /** Optional additional class names for the container */
  className?: string;
}

const AllowanceSlider: React.FC<AllowanceSliderProps> = ({
  label,
  defaultValue = 20,
  max = 100,
  step = 1,
  onValueChange,
  currencySymbol = '£',
  className,
}) => {
  const [sliderValue, setSliderValue] = useState([defaultValue]);

  useEffect(() => {
    console.log('AllowanceSlider loaded');
  }, []);

  const handleValueChange = (newValue: number[]) => {
    setSliderValue(newValue);
    if (onValueChange) {
      onValueChange(newValue[0]);
    }
  };

  const sliderId = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn('w-full space-y-4 p-4 rounded-lg bg-gray-50 border', className)}>
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor={sliderId} className="text-base font-medium text-gray-800">
          {label}
        </Label>
        <span className="text-xl font-bold text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full tabular-nums">
          {currencySymbol}
          {sliderValue[0]}
        </span>
      </div>
      <Slider
        id={sliderId}
        value={sliderValue}
        max={max}
        step={step}
        onValueChange={handleValueChange}
        className="cursor-grab active:cursor-grabbing"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>{currencySymbol}0</span>
        <span>{currencySymbol}{max}</span>
      </div>
    </div>
  );
};

export default AllowanceSlider;