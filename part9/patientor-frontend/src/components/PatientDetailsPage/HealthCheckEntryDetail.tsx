import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import { Box, Typography } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetail: React.FC<Props> = ({ entry, diagnoses }) => {
  if (entry.type !== "HealthCheck") {
    return null;
  }

  const getHealthColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return "grey";
    }
  };

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
        {entry.date} <HealthAndSafetyIcon />
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
      <FavoriteIcon sx={{ color: getHealthColor(entry.healthCheckRating) }} />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntryDetail;
