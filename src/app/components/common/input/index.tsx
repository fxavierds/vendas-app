import { InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";

interface inputProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  onChange?: (value: any) => void;
  label: string;
  columnClasses?: string;
  formatter?: (value: string) => string;
  error?: string;
}

export const Input: React.FC<inputProps> = ({
  onChange,
  label,
  columnClasses,
  value,
  id,
  formatter,
  error,
  ...inputProps
}: inputProps) => {
  const onInputChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value;

    onChange?.({
      ...event,
      target: {
        name,
        value: formattedValue,
      },
    });
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

export const InputMoney: React.FC<inputProps> = (props: inputProps) => {
  return <Input {...props} formatter={formatReal} />;
};
