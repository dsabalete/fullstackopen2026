import { useState, SyntheticEvent, useEffect } from "react";
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
  OutlinedInput,
  Chip,
} from "@mui/material";
import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";
import DateField from "./DateField";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";

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
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [type, setType] = useState<EntryFormValues["type"]>("HealthCheck");

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

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
      diagnosisCodes,
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
          <DateField
            label="Date"
            value={date}
            onChange={setDate}
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
            <HealthCheckFields
              healthCheckRating={healthCheckRating}
              setHealthCheckRating={setHealthCheckRating}
            />
          )}

          {type === "Hospital" && (
            <HospitalFields
              dischargeDate={dischargeDate}
              setDischargeDate={setDischargeDate}
              dischargeCriteria={dischargeCriteria}
              setDischargeCriteria={setDischargeCriteria}
            />
          )}

          {type === "OccupationalHealthcare" && (
            <OccupationalHealthcareFields
              employerName={employerName}
              setEmployerName={setEmployerName}
              sickLeaveStartDate={sickLeaveStartDate}
              setSickLeaveStartDate={setSickLeaveStartDate}
              sickLeaveEndDate={sickLeaveEndDate}
              setSickLeaveEndDate={setSickLeaveEndDate}
            />
          )}

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Diagnosis codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={({ target }) =>
                setDiagnosisCodes(
                  typeof target.value === "string"
                    ? target.value.split(",")
                    : target.value,
                )
              }
              input={<OutlinedInput label="Diagnosis codes" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
