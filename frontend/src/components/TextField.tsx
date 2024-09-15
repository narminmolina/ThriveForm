import {
  TextField as MTextField,
  TextFieldProps as MTextFieldProps,
} from "@mui/material";
import { ChangeEvent } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type TextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  MTextFieldProps;

export const TextField = <T extends FieldValues>({
  name,
  control,
  onChange,
  type,
  ...otherProps
}: TextFieldProps<T>) => {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue: string | number = event.target.value;

    if (type === "number") {
      newValue = Number(newValue);
    }

    fieldOnChange(newValue);
    onChange?.(event);
  };

  return (
    <MTextField
      {...field}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message}
      type={type}
      {...otherProps}
    />
  );
};
