"use client";
import React, { useState, useRef, useCallback } from "react";

interface PriceFilterProps {
  onPriceChange?: (
    min: number,
    max: number,
    sort?: "ascending" | "descending"
  ) => void;
}

const PriceFilter2: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
  const MIN_PRICE = 100;
  const MAX_PRICE = 45000;

  const [minPrice, setMinPrice] = useState<number>(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  const calculatePosition = (value: number): number => {
    return ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  };

  const calculateValueFromPosition = (position: number): number => {
    const percentage = position / 100;
    return Math.round(MIN_PRICE + percentage * (MAX_PRICE - MIN_PRICE));
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = calculateValueFromPosition(position);

      if (isDragging === "min") {
        const newMin = Math.min(newValue, maxPrice - 100);
        const clampedMin = Math.max(MIN_PRICE, newMin);
        setMinPrice(clampedMin);
        onPriceChange?.(clampedMin, maxPrice);
      } else if (isDragging === "max") {
        const newMax = Math.max(newValue, minPrice + 100);
        const clampedMax = Math.min(MAX_PRICE, newMax);
        setMaxPrice(clampedMax);
        onPriceChange?.(minPrice, clampedMax);
      }
    },
    [isDragging, minPrice, maxPrice, onPriceChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || MIN_PRICE;
    const clampedValue = Math.max(MIN_PRICE, Math.min(value, maxPrice - 100));
    setMinPrice(clampedValue);
    onPriceChange?.(clampedValue, maxPrice);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || MAX_PRICE;
    const clampedValue = Math.min(MAX_PRICE, Math.max(value, minPrice + 100));
    setMaxPrice(clampedValue);
    onPriceChange?.(minPrice, clampedValue);
  };

  const minPosition = calculatePosition(minPrice);
  const maxPosition = calculatePosition(maxPrice);

  return (
    <div className="w-full mx-auto  rounded-lg shadow-lg">
      {/* Custom Range Slider */}
      <div className="relative py-4">
        {/* Price labels */}
        {/* <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>${formatPrice(MIN_PRICE)}</span>
          <span>${formatPrice(MAX_PRICE)}</span>
        </div> */}

        {/* Slider track */}
        <div className="px-3 pt-3">
          <div
            ref={sliderRef}
            className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          >
            {/* Active range */}
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{
                left: `${minPosition}%`,
                width: `${maxPosition - minPosition}%`,
              }}
            />

            {/* Min handle */}
            <div
              className={`absolute w-5 h-5 bg-blue-600 rounded-full border-3 border-white shadow-md cursor-grab transform -translate-y-1/2 -translate-x-1/2 transition-transform hover:scale-110 ${
                isDragging === "min" ? "scale-110 cursor-grabbing" : ""
              }`}
              style={{
                left: `${minPosition}%`,
                top: "50%",
              }}
              onMouseDown={() => setIsDragging("min")}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                ${formatPrice(minPrice)}
              </div>
            </div>

            {/* Max handle */}
            <div
              className={`absolute w-5 h-5 bg-blue-600 rounded-full border-3 border-white shadow-md cursor-grab transform -translate-y-1/2 -translate-x-1/2 transition-transform hover:scale-110 ${
                isDragging === "max" ? "scale-110 cursor-grabbing" : ""
              }`}
              style={{
                left: `${maxPosition}%`,
                top: "50%",
              }}
              onMouseDown={() => setIsDragging("max")}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                ${formatPrice(maxPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={minPrice}
            onChange={handleMinInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Min price"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={maxPrice}
            onChange={handleMaxInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Max price"
          />
        </div>
      </div>

      {/* <div className="flex justify-between py-3">
        <div className="flex items-center ">
          <input
            type="radio"
            name="sortPrice"
            id={`descending`}
            // checked={activeFilters.category === category}
            onChange={() => onPriceChange?.(minPrice, maxPrice, "descending")}
            className="h-4 w-4 text-blue-600 rounded cursor-pointer"
          />
          <label
            htmlFor={`descending`}
            className="ml-2 text-sm cursor-pointer hover:underline"
          >
            High to Low
          </label>
        </div>
        <div className="flex items-center ">
          <input
            type="radio"
            name="sortPrice"
            id={`ascending`}
            // checked={activeFilters.category === category}
            onChange={() => onPriceChange?.(minPrice, maxPrice, "ascending")}
            className="h-4 w-4 text-blue-600 rounded cursor-pointer"
          />
          <label
            htmlFor={`ascending`}
            className="ml-2 text-sm cursor-pointer hover:underline"
          >
            Low to High
          </label>
        </div>
      </div> */}
      {/* Current selection display */}
      {/* <div className="text-center text-sm text-gray-600">
        Selected range:{" "}
        <span className="font-semibold">
          ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}
        </span>
      </div> */}
    </div>
  );
};

export default PriceFilter2;
