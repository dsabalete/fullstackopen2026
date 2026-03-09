import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface HealthCheckFieldsProps {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (rating: HealthCheckRating) => void;
}

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOption[] = Object.keys(HealthCheckRating)
  .filter((v) => isNaN(Number(v)))
  .map((v) => ({
    value: HealthCheckRating[v as keyof typeof HealthCheckRating],
    label: v,
  }));

const HealthCheckFields = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckFieldsProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 1 }}>
      <InputLabel>Healthcheck rating</InputLabel>
      <Select
        label="Healthcheck rating"
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      >
        {ratingOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HealthCheckFields;
