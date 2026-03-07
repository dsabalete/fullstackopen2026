import { Diagnosis, Entry } from "../../types";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetail: React.FC<Props> = ({ entry, diagnoses }) => {
  if (entry.type !== "Hospital") {
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
        {entry.date} <LocalHospitalIcon />
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
      <Typography>
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntryDetail;
