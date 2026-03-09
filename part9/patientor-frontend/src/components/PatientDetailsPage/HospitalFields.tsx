import { Typography, TextField } from "@mui/material";
import DateField from "./DateField";

interface HospitalFieldsProps {
  dischargeDate: string;
  setDischargeDate: (date: string) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (criteria: string) => void;
}

const HospitalFields = ({
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: HospitalFieldsProps) => {
  return (
    <>
      <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
        Discharge
      </Typography>
      <DateField
        label="Date"
        value={dischargeDate}
        onChange={setDischargeDate}
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
  );
};

export default HospitalFields;
