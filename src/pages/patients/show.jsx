import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function PatientsShow() {
  const [patient, setPatient] = useState({});
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

    fetchPatient();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>

      <div className="space-y-2">
      <p><strong>First Name:</strong> {patient.first_name}</p>
      <p><strong>Last Name:</strong> {patient.last_name}</p>
      {/* <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p> */}
      <p><strong>Date of Birth:</strong>{" "}{patient?.date_of_birth && new Date(patient.date_of_birth * 1000).toLocaleDateString()}</p>

      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Address:</strong> {patient.address}</p>

      <p><strong>ID:</strong> {patient.id}</p>
      <p><strong>Created At:</strong> {patient.createdAt}</p>
      <p><strong>Updated At:</strong> {patient.updatedAt}</p>
      </div>
    </>
  );
}
