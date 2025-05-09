import { InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  onChange?: (value) => void;
  label: string;
  columnClasses?: string;
}

export const Input: React.FC<inputProps> = ({
  onChange,
  label,
  columnClasses,
  value,
  id,
  ...inputProps
}: inputProps) => {
  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          {...inputProps}
          onChange={(event) => {
            if (onChange) {
              onChange(event.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};
