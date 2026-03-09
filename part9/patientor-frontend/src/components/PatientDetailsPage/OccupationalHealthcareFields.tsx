import { Typography, TextField } from "@mui/material";
import DateField from "./DateField";

interface OccupationalHealthcareFieldsProps {
  employerName: string;
  setEmployerName: (name: string) => void;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: (date: string) => void;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: (date: string) => void;
}

const OccupationalHealthcareFields = ({
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate,
}: OccupationalHealthcareFieldsProps) => {
  return (
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
      <DateField
        label="Start date"
        value={sickLeaveStartDate}
        onChange={setSickLeaveStartDate}
        sx={{ mb: 1, ml: 1 }}
      />
      <DateField
        label="End date"
        value={sickLeaveEndDate}
        onChange={setSickLeaveEndDate}
        sx={{ mb: 1, ml: 1 }}
      />
    </>
  );
};

export default OccupationalHealthcareFields;
