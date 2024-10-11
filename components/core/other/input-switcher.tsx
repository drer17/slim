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

interface InputSwitcherProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: InputSwitcherType;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

const InputSwitcher: React.FC<InputSwitcherProps> = ({
  value,
  type,
  onValueChange,
  onBlur,
  placeholder,
  ...rest
}) => {
  switch (type) {
    case InputSwitcherType.string:
      return (
        <Input
          className="h-8 capitalize"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange(e.currentTarget.value)}
          onBlur={() => onBlur && onBlur()}
          {...rest}
        />
      );
    case InputSwitcherType.number:
      return (
        <Input
          className="h-8 capitalize"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange(e.currentTarget.value)}
          type="number"
          onBlur={() => onBlur && onBlur()}
          {...rest}
        />
      );
  }
};

export default InputSwitcher;
