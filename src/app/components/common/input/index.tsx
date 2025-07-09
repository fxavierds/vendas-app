import { InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";

interface inputProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  onChange?: (value: any) => void;
  label: string;
  columnClasses?: string;
  currency?: boolean;
  error?: string;
}

export const Input: React.FC<inputProps> = ({
  onChange,
  label,
  columnClasses,
  value,
  id,
  currency,
  error,
  ...inputProps
}: inputProps) => {
  const onInputChange = (event: { target: { value: any } }) => {
    let value = event.target.value;
    if (value && currency) {
      value = formatReal(value);
    }
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          value={value}
          {...inputProps}
          onChange={onInputChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};
