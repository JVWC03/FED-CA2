import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreatePrescription() {
  const [form, setForm] = useState({
    diagnosis_id: "",
    doctor_id: "",
    patient_id: "",
    medication: "",
    dosage: "",
    start_date: "",
    end_date: "",
  });

  const [diagnoses, setDiagnoses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diagnosisResponse, doctorResponse, patientResponse] = await Promise.all([
          axios.get("https://ca2-med-api.vercel.app/diagnoses", { headers: { Authorization: `Bearer ${token}` },}),
          axios.get("https://ca2-med-api.vercel.app/doctors", {headers: { Authorization: `Bearer ${token}` },}),
          axios.get("https://ca2-med-api.vercel.app/patients", {headers: { Authorization: `Bearer ${token}` },}),
        ]);

        setDiagnoses(diagnosisResponse.data);
        setDoctors(doctorResponse.data);
        setPatients(patientResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token]);

  // Updates the form state whenever an input field changes
  const handleChange = (e) => {
    let value = e.target.value;

    if (
      e.target.name === "diagnosis_id" ||
      e.target.name === "doctor_id" ||
      e.target.name === "patient_id"
    ) {
      value = Number(value);
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  // Sends a POST request to the API to create a new presceription
  const createPrescription = async () => {
    const options = {
      method: "POST",
      url: "https://ca2-med-api.vercel.app/prescriptions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      navigate("/prescriptions");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createPrescription();
  };

  return (
    <>
      <h1>Create a Prescription</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">
            <strong>Diagnosis</strong>
            </label>
          <select
            name="diagnosis_id"
            value={form.diagnosis_id}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select a diagnosis</option>
            {diagnoses.map(d => (
              <option key={d.id} value={d.id}>
                {d.condition}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1"><strong>Doctor</strong></label>
          <select
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.first_name} {doctor.last_name}
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
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.first_name} {patient.last_name}
              </option>
            ))}
          </select>
        </div>

        <Input
          className="mt-1 w-full"
          type="text"
          placeholder="Medication"
          name="medication"
          value={form.medication}
          onChange={handleChange}
        />

        <Input
          className="mt-1 w-full"
          type="text"
          placeholder="Dosage"
          name="dosage"
          value={form.dosage}
          onChange={handleChange}
        />

        <Input
          className="mt-1 w-full"
          type="date"
          placeholder="Start Date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />

        <Input
          className="mt-1 w-full"
          type="date"
          placeholder="End Date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
        />

        <Button className="mt-4" variant="outline" type="submit">
          Create Prescription
        </Button>
      </form>
    </>
  );
}
