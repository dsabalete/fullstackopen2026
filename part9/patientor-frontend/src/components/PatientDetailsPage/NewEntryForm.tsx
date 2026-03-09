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
  const [type, setType] = useState<EntryFormValues["type"]>("HealthCheck");

  // Hospital fields
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // Occupational fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseValues = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(",").map((c) => c.trim())
        : undefined,
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseValues,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseValues,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseValues,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
              : undefined,
        });
        break;
    }
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
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          New {type} entry
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Entry type</InputLabel>
          <Select
            label="Entry type"
            value={type}
            onChange={({ target }) =>
              setType(target.value as EntryFormValues["type"])
            }
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>

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

          {type === "HealthCheck" && (
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
          )}

          {type === "Hospital" && (
            <>
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                Discharge
              </Typography>
              <TextField
                label="Date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                sx={{ mb: 1, ml: 1 }}
              />
              <TextField
                label="Criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                sx={{ mb: 1, ml: 1 }}
              />
            </>
          )}

          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                Sick leave
              </Typography>
              <TextField
                label="Start date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
                sx={{ mb: 1, ml: 1 }}
              />
              <TextField
                label="End date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
                sx={{ mb: 1, ml: 1 }}
              />
            </>
          )}

          <TextField
            label="Diagnosis codes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
