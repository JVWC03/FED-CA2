import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

export default function EditAppointment() {
  const [form, setForm] = useState({
    doctor_id: "",
    patient_id: "",
    appointment_date: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors, patients, and appointment data
        const [doctorResponse, patientResponse, appointmentResponse] = await Promise.all([
          axios.get("https://ca2-med-api.vercel.app/doctors", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://ca2-med-api.vercel.app/patients", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get(`https://ca2-med-api.vercel.app/appointments/${id}`, { headers: { Authorization: `Bearer ${token}` }})
        ]);

        setDoctors(doctorResponse.data);
        setPatients(patientResponse.data);

        const appointment = appointmentResponse.data;
        setForm({
          doctor_id: appointment.doctor_id,
          patient_id: appointment.patient_id,
          appointment_date: new Date(appointment.appointment_date * 1000).toISOString().split('T')[0],
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateAppointment = async () => {
  const options = {
    method: "PATCH",
    url: `https://ca2-med-api.vercel.app/appointments/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      doctor_id: Number(form.doctor_id),
      patient_id: Number(form.patient_id),
      appointment_date: form.appointment_date,
    },
  };

  try {
    let response = await axios.request(options);
    console.log(response.data);
    navigate('/appointments');
  } catch (err) {
    console.log(err);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    updateAppointment();
  };

  return (
    <>
      <h1>Update an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1"><strong>Doctor</strong></label>
          <select
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select a doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.first_name} {doc.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1"><strong>Patient</strong></label>
          <select
            name="patient_id"
            value={form.patient_id}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select a patient</option>
            {patients.map((pat) => (
              <option key={pat.id} value={pat.id}>
                {pat.first_name} {pat.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1"><strong>Appointment Date</strong></label>
          <Input
            className="mt-1 w-full"
            type="date"
            placeholder="Appointment Date"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleChange}
          />
        </div>

        <Button className="mt-4" variant="outline" type="submit">
          Update Appointment
        </Button>
      </form>
    </>
  );
}
