import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function DoctorsShow() {
  const [doctor, setDoctor] = useState({});
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

    fetchDoctor();
  }, []);

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
    </>
  );
}
