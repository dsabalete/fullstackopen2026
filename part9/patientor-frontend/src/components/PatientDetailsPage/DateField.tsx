import { TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps<Theme>;
}

const DateField = ({ label, value, onChange, sx }: DateFieldProps) => (
  <TextField
    label={label}
    type="date"
    fullWidth
    value={value}
    onChange={({ target }) => onChange(target.value)}
    InputLabelProps={{ shrink: true }}
    sx={sx}
  />
);

export default DateField;
