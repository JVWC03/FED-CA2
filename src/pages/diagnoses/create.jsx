import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateDiagnosis() {
  const [form, setForm] = useState({
    patient_id: "",
    condition: "",
    diagnosis_date: "",
  });

  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("https://ca2-med-api.vercel.app/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPatients();
  }, [token]);

  const handleChange = (e) => {
  let value = e.target.value;

  if (e.target.name === "patient_id") {
    value = Number(value);
  }

  setForm({
    ...form,
    [e.target.name]: value,
  });
};


  const createDiagnosis = async () => {
  const options = {
    method: "POST",
    url: `https://ca2-med-api.vercel.app/diagnoses`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: form,
  };

  try {
    let response = await axios.request(options);
    console.log(response.data);
    navigate('/diagnoses');
  } catch (err) {
    console.log(err);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createDiagnosis();
  };

  return (
    <>
      <h1>Create a new Diagnosis</h1>
      <form onSubmit={handleSubmit}>
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
          <label className="block mb-1"><strong>Condition</strong></label>
          <Input
            type="text"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
            placeholder="Enter diagnosis condition"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            <strong>Diagnosis Date</strong>
            </label>
          <Input
            className="mt-1 w-full"
            type="date"
            placeholder="Diagnoses Date"
            name="diagnosis_date"
            value={form.diagnosis_date}
            onChange={handleChange}
          />
        </div>

        <Button 
            className="mt-4" 
            variant="outline" 
            type="submit">
                Create Diagnosis
        </Button>
      </form>
    </>
  );
}
