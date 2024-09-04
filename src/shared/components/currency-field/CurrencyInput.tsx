import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { TextField as MuiTextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {
  NumberFormatCustomProps,
  TextFieldProps
} from './services/currencyFieldInterface';

const NumberFormatCustom = React.forwardRef<
  { onChange: Function },
  NumberFormatCustomProps
>((props, ref) => {
  const { onChange, ...numberFormatProps } = props;

  const onValueChange = (values: { value: string }) => {
    onChange({
      target: {
        value: values.value
      }
    });
  };

  return (
    <NumericFormat
      onValueChange={onValueChange}
      valueIsNumericString={true}
      decimalSeparator=","
      getInputRef={ref}
      {...numberFormatProps}
    />
  );
});

export const CurrencyInput = ({ ...props }: TextFieldProps) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <MuiTextField
      value={value}
      onChange={handleChange}
      {...props}
      slotProps={{
        input: {
          inputComponent: NumberFormatCustom as any,
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }
      }} />
  );
};
