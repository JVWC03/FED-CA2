import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function DoctorsShow() {
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctor = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/doctors/${id}`,
        headers: { 
          Authorization: `Bearer ${token}`
         }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDoctor(response.data);
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
        setAppointments(response.data.filter(a => a.doctor_id == id));
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
        setPrescriptions(response.data.filter(p => p.doctor_id == id));
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctor();
    fetchAppointments();
    fetchPrescriptions();
  }, []);

  const unixToLocalDateString = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toLocaleDateString();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>

      <div className="space-y-2">
        <p><strong>First Name:</strong> {doctor.first_name}</p>
        <p><strong>Last Name:</strong> {doctor.last_name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
        <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
        <p><strong>ID:</strong> {doctor.id}</p>
        <p><strong>Created At:</strong> {doctor.createdAt}</p>
        <p><strong>Updated At:</strong> {doctor.updatedAt}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul>
            {appointments.map(a => (
              <li key={a.id}>
                <strong>Date:</strong> {unixToLocalDateString(a.appointment_date)} - <strong>Patient:</strong> {a.patient_id}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Prescriptions</h2>
        {prescriptions.length === 0 ? (
          <p>No prescriptions found.</p>
        ) : (
          <ul>
            {prescriptions.map(p => (
              <li key={p.id}>
                <strong>Medication:</strong> {p.medication} - <strong>Dosage:</strong> {p.dosage}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
