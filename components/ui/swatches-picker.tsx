import React from "react";
import { TwitterPicker } from "react-color";

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
  console.log(presetColors);
  return (
    <TwitterPicker
      color={color}
      onChangeComplete={(colour: any) => onChange(colour.hex)}
      colors={presetColors}
    />
  );
};

export default SwatchesPicker;
