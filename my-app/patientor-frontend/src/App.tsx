import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientView/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

import { Diagnosis } from "./types";

const PatientView = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then(response => {
        setPatient(response.data.find((p: { id: string | undefined; }) => p.id === id));
      });

  }, [id]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then(response => {
        setDiagnoses(response.data);
      });
  }, []);

  if (!patient || diagnoses.length === 0) {
    return <p>loading</p>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      {
        patient.gender === 'male'
        ? <MaleIcon/>
        : patient.gender === 'female'
          ? <FemaleIcon/>
          : <HelpOutlineIcon/>
      }
      <p>ssn {patient.ssn}</p>
      <p>{patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((e,i) =>
        <div key={i}>
          <p>{e.date} <i>{e.description}</i></p>
          <ul>
            {e.diagnosisCodes && e.diagnosisCodes.map((dc,i) =>
              <li key={i}>
                {/* {dc} {diagnoses.find(d => d.code === dc).name} */}
                {dc} {diagnoses.find(d => d.code === dc)?.name ?? ""}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
