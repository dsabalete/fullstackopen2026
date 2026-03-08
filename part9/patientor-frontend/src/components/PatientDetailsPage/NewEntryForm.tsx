import { useState, SyntheticEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  error?: string;
}

const NewEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy,
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(",").map((c) => c.trim())
        : undefined,
    });
  };

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

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          my: 2,
          p: 2,
          border: "2px dotted black",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          New HealthCheck entry
        </Typography>
        <form onSubmit={addEntry}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            sx={{ mb: 1 }}
          />

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Healthcheck rating</InputLabel>
            <Select
              label="Healthcheck rating"
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Diagnosis codes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default NewEntryForm;
