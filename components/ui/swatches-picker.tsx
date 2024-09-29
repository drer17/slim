import React from "react";
import { HexColorPicker } from "react-colorful";

export interface SwatchesPickerProps {
  color: string;
  onChange: (color: string) => void;
  presetColors: string[];
}

const SwatchesPicker: React.FC<SwatchesPickerProps> = ({
  color,
  onChange,
  presetColors,
}) => {
  return (
    <div>
      <HexColorPicker color={color} onChange={onChange} />
      <div className="space-x-2 mt-3">
        {presetColors.map((presetColor) => (
          <button
            className="w-6 h-6 rounded-md"
            key={presetColor}
            style={{ background: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </div>
  );
};

export default SwatchesPicker;
