import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

export default function EditDiagnosis() {
  const [form, setForm] = useState({
    condition: "",
    diagnosis_date: "",
    patient_id: "",
  });

  const [patients, setPatients] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diagnosisResponse, patientsResponse] = await Promise.all([
          axios.get(`https://ca2-med-api.vercel.app/diagnoses/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://ca2-med-api.vercel.app/patients", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const diagnosis = diagnosisResponse.data;

        setForm({
          condition: diagnosis.condition,
          diagnosis_date: new Date(diagnosis.diagnosis_date * 1000).toISOString().split('T')[0],
          patient_id: diagnosis.patient_id,
        });

        setPatients(patientsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, token]);

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

  // Sends a PUT request to the API to update a diagnosis
  const updateDiagnosis = async () => {
    try {
      const response = await axios.patch(`https://ca2-med-api.vercel.app/diagnoses/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      navigate('/diagnoses');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDiagnosis();
  };

  return (
    <>
      <h1>Update a Diagnosis</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1"><strong>Condition</strong></label>
          <Input
            className="mt-2"
            type="text"
            placeholder="Condition"
            name="condition"
            value={form.condition}
            onChange={handleChange}
          />
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
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.first_name} {patient.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1"><strong>Diagnosis Date</strong></label>
          <Input
            className="mt-2 w-full"
            type="date"
            placeholder="Diagnosis Date"
            name="diagnosis_date"
            value={form.diagnosis_date}
            onChange={handleChange}
          />
        </div>

        <Button className="mt-4" variant="outline" type="submit">
          Update Diagnosis
        </Button>
      </form>
    </>
  );
}
