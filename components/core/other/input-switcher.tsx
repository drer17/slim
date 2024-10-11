"use client";

/*
 * Input Switcher
 *
 * Author: Andre Repanich
 * Date: 9-10-24
 *
 * Component Requirements:
 * [X]- Switch input option based on the type
 *    - used in the attribute component
 */

import { Input } from "@/components/ui/input";

export enum InputSwitcherType {
  string = "string",
  number = "number",
}

interface InputSwitcherProps {
  value: string;
  type: InputSwitcherType;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

const InputSwitcher: React.FC<InputSwitcherProps> = ({
  value,
  type,
  onChange,
  onBlur,
  placeholder,
}) => {
  switch (type) {
    case InputSwitcherType.string:
      return (
        <Input
          className="h-8 capitalize"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={() => onBlur && onBlur()}
        />
      );
    case InputSwitcherType.number:
      return (
        <Input
          className="h-8 capitalize"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          type="number"
          onBlur={() => onBlur && onBlur()}
        />
      );
  }
};

export default InputSwitcher;
