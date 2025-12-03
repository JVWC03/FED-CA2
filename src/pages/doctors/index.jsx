import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Index() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/doctors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setDoctors(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctors();
  }, []);

  const onDeleteCallback = (id) => {
  toast.success("Doctor deleted successfully");
  setDoctors(doctors.filter((doctor) => doctor.id !== id));
};


  return (
    <>
      <Button
        asChild
        variant="primary"
        className="mb-4 mr-auto-block"
      >
        <Link size="sm" to={`/doctors/create`}>Create New Doctor</Link>
      </Button>

      <Table>
  <TableCaption>List of registered doctors.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>First Name</TableHead>
      <TableHead>Last Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Phone</TableHead>
      <TableHead>Specialisation</TableHead>
      {token && <TableHead>Actions</TableHead>}
    </TableRow>
  </TableHeader>
  <TableBody>
    {doctors.map((doctor) => (
      <TableRow key={doctor.id}>
        <TableCell>{doctor.first_name}</TableCell>
        <TableCell>{doctor.last_name}</TableCell>
        <TableCell>{doctor.email}</TableCell>
        <TableCell>{doctor.phone}</TableCell>
        <TableCell>{doctor.specialisation}</TableCell>

        {token && (
          <TableCell>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer hover:border-blue-500"
                variant="outline"
                size="icon"
                onClick={() => navigate(`/doctors/${doctor.id}`)}
              >
                <Eye />
              </Button>

              <Button
                className="cursor-pointer hover:border-blue-500"
                variant="outline"
                size="icon"
                onClick={() => navigate(`/doctors/${doctor.id}/edit`)}
              >
                <Pencil />
              </Button>

              {/* Delete button */}
              <DeleteButton
                resource="doctors"
                id={doctor.id}
                onDeleteCallback={onDeleteCallback}
              />
            </div>
          </TableCell>
        )}
      </TableRow>
    ))}
  </TableBody>
</Table>

    </>
  );
}
