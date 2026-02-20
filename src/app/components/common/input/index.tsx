import { InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";
import { FormatUtils } from "@4us-dev/utils";

const formatUtils = new FormatUtils();

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

export const InputCpf: React.FC<inputProps> = (props: inputProps) => {
  return <Input {...props} formatter={formatUtils.formatCPF} />;
};

export const InputTelefone: React.FC<inputProps> = (props: inputProps) => {
  return <Input {...props} formatter={formatUtils.formatPhone} />;
};

export const InputDate: React.FC<inputProps> = (props: inputProps) => {
  const formatData = (value: string) => {
    if (!value) {
      return " ";
    }

    const data = formatUtils.formatOnlyIntegers(value);
    const size = data.length;

    if (size <= 2) {
      return data;
    }

    if (size <= 4) {
      console.log("data", data.substring(2, 3));
      return data.substring(0, 2) + "/" + data.substring(2, 4);
    }

    if (size <= 6) {
      return (
        data.substring(0, 2) +
        "/" +
        data.substring(2, 4) +
        "/" +
        data.substring(4, 8)
      );
    }

    return (
      data.substring(0, 2) +
      "/" +
      data.substring(2, 4) +
      "/" +
      data.substring(4, 8)
    );
  };
  return <Input {...props} maxLength={10} formatter={formatData} />;
};
