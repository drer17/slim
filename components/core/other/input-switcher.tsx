import { Input } from "@/components/ui/input";

interface InputSwitcherProps {
  value: string;
  type: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const InputSwitcher: React.FC<InputSwitcherProps> = ({
  value,
  type,
  onChange,
  onBlur,
}) => {
  switch (type) {
    case "string":
      return (
        <Input
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={() => onBlur && onBlur()}
        />
      );
    case "number":
      return (
        <Input
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          type="number"
          onBlur={() => onBlur && onBlur()}
        />
      );
  }
};

export default InputSwitcher;
