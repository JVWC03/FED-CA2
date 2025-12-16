import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function PatientsShow() {
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/patients/${id}`,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setPatient(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAppointments = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/appointments`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        let response = await axios.request(options);
        setAppointments(response.data.filter(a => a.patient_id == id));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPrescriptions = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/prescriptions`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        let response = await axios.request(options);
        setPrescriptions(response.data.filter(p => p.patient_id == id));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchDiagnoses = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/diagnoses`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        let response = await axios.request(options);
        setDiagnoses(response.data.filter(d => d.patient_id == id));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatient();
    fetchAppointments();
    fetchPrescriptions();
    fetchDiagnoses();
  }, []);

  const unixToLocalDateString = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toLocaleDateString();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>

      <div className="space-y-2">
        <p><strong>First Name:</strong> {patient.first_name}</p>
        <p><strong>Last Name:</strong> {patient.last_name}</p>
        <p><strong>Date of Birth:</strong>{" "}{patient?.date_of_birth && new Date(patient.date_of_birth * 1000).toLocaleDateString()}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>ID:</strong> {patient.id}</p>
        <p><strong>Created At:</strong> {patient.createdAt}</p>
        <p><strong>Updated At:</strong> {patient.updatedAt}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        {appointments.length === 0 ? <p>No appointments found.</p> : (
          <ul>
            {appointments.map(a => (
              <li key={a.id}>
                <strong>Date:</strong> {unixToLocalDateString(a.appointment_date)} - <strong>Doctor:</strong> {a.doctor_id}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Prescriptions</h2>
        {prescriptions.length === 0 ? <p>No prescriptions found.</p> : (
          <ul>
            {prescriptions.map(p => (
              <li key={p.id}>
                <strong>Medication:</strong> {p.medication} - <strong>Dosage:</strong> {p.dosage} - <strong>Doctor:</strong> {p.doctor_id}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Diagnoses</h2>
        {diagnoses.length === 0 ? <p>No diagnoses found.</p> : (
          <ul>
            {diagnoses.map(d => (
              <li key={d.id}>
                <strong>Date:</strong> {unixToLocalDateString(d.diagnosis_date)} - <strong>Condition:</strong> {d.condition}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
