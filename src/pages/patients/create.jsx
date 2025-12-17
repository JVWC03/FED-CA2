import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Create() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Updates the form state whenever an input field changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Sends a POST request to the API to create a new patient
  const createPatient = async () => {
    const options = {
      method: "POST",
      url: `https://ca2-med-api.vercel.app/patients`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    };

    try {
      let response = await axios.request(options);
      console.log(response.data);
      navigate('/patients');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createPatient();
  };

  return (
    <>
      <h1>Create a new patient</h1>
      <form onSubmit={handleSubmit}>
        <Input
          className="mt-2"
          type="text"
          placeholder="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          type="date"
          placeholder="Date of Birth"
          name="date_of_birth"
          value={form.date_of_birth}
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          type="text"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          type="text"
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <Button
          className="mt-4 cursor-pointer"
          variant="outline"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
