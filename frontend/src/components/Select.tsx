import {
  Select as MSelect,
  SelectProps as MSelectProps,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

// Define a reusable Select component that integrates with react-hook-form
type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  MSelectProps & {
    menuItems: { value: string; label: string }[];
    isRequired?: boolean;
  };

export const Select = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  menuItems,
  label,
  isRequired = false,
  ...otherProps
}: SelectProps<T>) => {
  const {
    field: { value, onChange: fieldOnChange, ref, ...field },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    fieldOnChange(event);
  };

  return (
    <FormControl
      sx={{ width: "180px" }}
      variant="outlined"
      error={!!error}
      required={isRequired}
    >
      <InputLabel>{label}</InputLabel>
      <MSelect
        {...field}
        value={value || ""}
        onChange={handleChange}
        label={label}
        inputRef={ref}
        {...otherProps}
      >
        {otherProps.children}
        {menuItems.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </MSelect>

      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
