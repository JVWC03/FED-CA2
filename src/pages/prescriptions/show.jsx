import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function PrescriptionsShow() {
  const [prescription, setPrescription] = useState({});
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);

  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          prescriptionResponse,
          patientsResponse,
          doctorsResponse,
          diagnosesResponse,
        ] = await Promise.all([
          axios.get(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {headers: { Authorization: `Bearer ${token}` },}),
          axios.get(`https://ca2-med-api.vercel.app/patients`, {headers: { Authorization: `Bearer ${token}` },}),
          axios.get(`https://ca2-med-api.vercel.app/doctors`, {headers: { Authorization: `Bearer ${token}` },}),
          axios.get(`https://ca2-med-api.vercel.app/diagnoses`, {headers: { Authorization: `Bearer ${token}` },}),
        ]);

        setPrescription(prescriptionResponse.data);
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
        setDiagnoses(diagnosesResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, token]);

  // Find the patients doctors and diagnoses linked to this prescription using IDs
  const patient = patients.find(patient => patient.id === prescription.patient_id);
  const doctor = doctors.find(doctor => doctor.id === prescription.doctor_id);
  const diagnosis = diagnoses.find(d => d.id === prescription.diagnosis_id);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Prescription Details</h1>

      <div className="space-y-2">
        <p><strong>Medication:</strong> {prescription.medication}</p>
        <p><strong>Dosage:</strong> {prescription.dosage}</p>
        <p><strong>Patient:</strong>{" "} {patient ? `${patient.first_name} ${patient.last_name}` : prescription.patient_id}</p>
        <p><strong>Doctor:</strong>{" "} {doctor ? `${doctor.first_name} ${doctor.last_name}` : prescription.doctor_id}</p>
        <p><strong>Diagnosis:</strong>{" "} {diagnosis ? diagnosis.condition : prescription.diagnosis_id}</p>
        <p><strong>Start Date:</strong>{" "} {prescription.start_date ? new Date(prescription.start_date * 1000).toLocaleDateString() : ""}</p>
        <p><strong>End Date:</strong>{" "} {prescription.end_date ? new Date(prescription.end_date * 1000).toLocaleDateString() : ""}</p>
        <p><strong>ID:</strong> {prescription.id}</p>
        <p><strong>Created At:</strong> {prescription.createdAt}</p>
        <p><strong>Updated At:</strong> {prescription.updatedAt}</p>
      </div>
    </>
  );
}
