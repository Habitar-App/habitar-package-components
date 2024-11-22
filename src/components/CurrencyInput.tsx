import { Input, InputProps } from "@/components/Input";
import { useEffect, useState } from "react";
import { NumberFormatBase, NumericFormatProps } from "react-number-format";

interface CurrencyInputProps extends NumericFormatProps {
  value?: string | number;
}
export function CurrencyInput({
  onChange,
  onValueChange,
  required,
  value: valueProp,
  ...props
}: InputProps & CurrencyInputProps) {
  const [inputValue, setInputValue] = useState<number | undefined>(
    valueProp !== undefined ? Number(valueProp) : undefined
  );

  useEffect(() => {
    if (valueProp !== undefined) {
      setInputValue(Number(valueProp));
    }
  }, [valueProp]);

  const formatCurrencyByEnd = (value?: string): string => {
    if (!Number(value)) return "R$ 0,00";

    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(parseFloat(value as any) / 100);

    return `${amount}`;
  };

  const revertFormat = (value: string): string => {
    if (!value) return "0";
    return parseFloat(
      value
        .replaceAll(".", "")
        .replace(",", ".")
        .replace(/[^0-9.]/g, "")
    ).toString();
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);

    if (valueProp !== undefined) {
      onValueChange &&
        onValueChange(
          {
            floatValue: Number(revertFormat(event.target.value)),
            value: revertFormat(event.target.value),
            formattedValue: event.target.value,
          },
          null as any
        );
    }
  };

  return (
    <>
      <NumberFormatBase
        {...props}
        customInput={Input}
        onChange={onInputChange}
        value={inputValue?.toFixed(2) || (0).toFixed(2)}
        onValueChange={({ formattedValue }) => {
          setInputValue(Number(revertFormat(formattedValue)));
          onValueChange &&
            onValueChange(
              {
                floatValue: Number(revertFormat(formattedValue)),
                value: revertFormat(formattedValue),
                formattedValue,
              },
              null as any
            );
        }}
        format={formatCurrencyByEnd}
        maxLength={21}
      />
    </>
  );
}
