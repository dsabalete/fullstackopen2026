import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HospitalEntryDetail from "./HospitalEntryDetail";
import OccupationalHealthcareEntryDetail from "./OccupationalHealthcareEntryDetail";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";

const EntryDetails: React.FC<{
  entry: Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetail
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
