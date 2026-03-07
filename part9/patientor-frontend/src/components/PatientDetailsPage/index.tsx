import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";

import { Patient, Gender, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      if (id) {
        const result = await diagnosesService.getAll();
        setDiagnoses(result);
      }
    };
    void fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const GenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      case Gender.Other:
        return <Transgender />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {patient.name} <GenderIcon />
      </Typography>
      <Typography sx={{ mt: 2 }}>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
        entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries found.</Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </Box>
  );
};

export default PatientDetailsPage;
