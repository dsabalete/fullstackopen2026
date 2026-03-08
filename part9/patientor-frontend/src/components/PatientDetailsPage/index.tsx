import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";
import axios from "axios";

import { Patient, Gender, Diagnosis, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const result = await diagnosesService.getAll();
      setDiagnoses(result);
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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const updatedPatient = await patientService.createEntry(
        patient.id,
        values,
      );
      setPatient(updatedPatient);
      setShowForm(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (
          e?.response?.data &&
          (typeof e?.response?.data === "string" ||
            typeof e?.response?.data === "object")
        ) {
          const errorData = e.response.data;
          let message = "Something went wrong";

          if (typeof errorData === "string") {
            message = errorData.replace("Something went wrong. Error: ", "");
          } else if (
            errorData &&
            typeof errorData === "object" &&
            "error" in errorData
          ) {
            const errorValue = (
              errorData as {
                error: string | Array<{ message: string; path: string[] }>;
              }
            ).error;
            if (Array.isArray(errorValue)) {
              message = errorValue
                .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                .join(", ");
            } else if (typeof errorValue === "string") {
              message = errorValue;
            }
          }

          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {patient.name} <GenderIcon />
      </Typography>
      <Typography sx={{ mt: 2 }}>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      {showForm ? (
        <NewEntryForm
          onSubmit={submitNewEntry}
          onCancel={() => setShowForm(false)}
          error={error}
        />
      ) : (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ mt: 2 }}
        >
          Add New Entry
        </Button>
      )}

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
        entries
      </Typography>
      {!patient.entries || patient.entries.length === 0 ? (
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
