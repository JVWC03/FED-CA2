import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Create() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    specialisation: "",
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

  // Sends a POST request to the API to create a new doctor
  const createDoctor = async () => {
    const options = {
      method: "POST",
      url: `https://ca2-med-api.vercel.app/doctors`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: form,
    };

    try {
      let response = await axios.request(options);
      console.log(response.data);
      navigate('/doctors');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createDoctor();
  };

  return (
    <>
      <h1>Create a new doctor</h1>
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
          placeholder="Specialisation"
          name="specialisation"
          value={form.specialisation}
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
