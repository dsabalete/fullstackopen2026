import { Diagnosis, Entry } from "../../types";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetail: React.FC<Props> = ({
  entry,
  diagnoses,
}) => {
  if (entry.type !== "OccupationalHealthcare") {
    return null;
  }

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <Typography>
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            <Typography>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </Typography>
          </li>
        ))}
      </ul>
      {entry.sickLeave && (
        <Typography>
          sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetail;
