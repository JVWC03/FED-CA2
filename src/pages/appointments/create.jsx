import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateAppointment() {
  const [form, setForm] = useState({
    doctor_id: "",
    patient_id: "",
    appointment_date: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch doctors and patients for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorResponse, patientResponse] = await Promise.all([
          axios.get("https://ca2-med-api.vercel.app/doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://ca2-med-api.vercel.app/patients", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setDoctors(doctorResponse.data);
        setPatients(patientResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e) => {
  let value = e.target.value;
  
  if (e.target.name === "doctor_id" || e.target.name === "patient_id") {
    value = Number(value);
  }

  setForm({
    ...form,
    [e.target.name]: value,
  });
};


  const createAppointment = async () => {
  const options = {
    method: "POST",
    url: `https://ca2-med-api.vercel.app/appointments`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: form,
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
    createAppointment();
  };

  return (
    <>
      <h1>Create a new Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label className="block mb-1">
            <strong>Doctor</strong>
        </label>
            <select
                name="doctor_id"
                value={form.doctor_id}
                onChange={handleChange}
                className="mt-1 w-full border rounded p-2"
            >
        <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
            {doctor.first_name} {doctor.last_name}
        </option>
    ))}
  </select>
</div>

        <div className="mb-4">
        <label className="block mb-1">
            <strong>Patient</strong>
        </label>
            <select
                name="patient_id"
                value={form.patient_id}
                onChange={handleChange}
                className="mt-1 w-full border rounded p-2"
            >
            <option value="">Select a patient</option>
                {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                {patient.first_name} {patient.last_name}
            </option>
        ))}
  </select>
</div>

<div className="mb-4">
  <label className="block mb-1">
    <strong>Appointment Date</strong>
  </label>
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
          Create Appointment
        </Button>
      </form>
    </>
  );
}
