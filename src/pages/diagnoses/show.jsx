import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function DiagnosesShow() {
  const [diagnosis, setDiagnosis] = useState({});
  const [patients, setPatients] = useState([]);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diagnosisResponse, patientsResponse] = await Promise.all([
          axios.get(`https://ca2-med-api.vercel.app/diagnoses/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`https://ca2-med-api.vercel.app/patients`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setDiagnosis(diagnosisResponse.data);
        setPatients(patientsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, token]);

  const patient = patients.find(patient => patient.id === diagnosis.patient_id);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Diagnosis Details</h1>
      <div className="space-y-2">
        <p><strong>Condition:</strong> {diagnosis.condition}</p>
        <p><strong>Patient:</strong> {patient ? `${patient.first_name} ${patient.last_name}` : diagnosis.patient_id}</p>
        <p><strong>Date:</strong> {diagnosis.diagnosis_date && new Date(diagnosis.diagnosis_date * 1000).toLocaleDateString()}</p>
        <p><strong>ID:</strong> {diagnosis.id}</p>
        <p><strong>Created At:</strong> {diagnosis.createdAt}</p>
        <p><strong>Updated At:</strong> {diagnosis.updatedAt}</p>
      </div>
    </>
  );
}
