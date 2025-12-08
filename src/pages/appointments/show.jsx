import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function AppointmentsShow() {
  const [appointment, setAppointment] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentResponse, doctorsResponse, patientsResponse] = await Promise.all([
          axios.get(`https://ca2-med-api.vercel.app/appointments/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`https://ca2-med-api.vercel.app/doctors`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`https://ca2-med-api.vercel.app/patients`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setAppointment(appointmentResponse.data);
        setDoctors(doctorsResponse.data);
        setPatients(patientsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, token]);

  const doctor = doctors.find(doctor => doctor.id === appointment.doctor_id);
  const patient = patients.find(patient => patient.id === appointment.patient_id);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>
      <div className="space-y-2">
        <p><strong>Doctor:</strong> {doctor ? `${doctor.first_name} ${doctor.last_name}` : appointment.doctor_id}</p>
        <p><strong>Patient:</strong> {patient ? `${patient.first_name} ${patient.last_name}` : appointment.patient_id}</p>
        <p><strong>Date:</strong> {appointment.appointment_date && new Date(appointment.appointment_date * 1000).toLocaleDateString()}</p>
        <p><strong>ID:</strong> {appointment.id}</p>
        <p><strong>Created At:</strong> {appointment.createdAt}</p>
        <p><strong>Updated At:</strong> {appointment.updatedAt}</p>
      </div>
    </>
  );
}
