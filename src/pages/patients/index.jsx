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
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/patients",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setPatients(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatients();
  }, []);

  const onDeleteCallback = (id) => {
  toast.success("Patient deleted successfully");
  setPatients(patients.filter((patient) => patient.id !== id));
};


  return (
    <>
      <Button
        asChild
        variant="primary"
        className="mb-4 mr-auto-block"
      >
        <Link size="sm" to={`/patients/create`}>Create New Patient</Link>
      </Button>

      <Table>
  <TableCaption>List of registered patients.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>First Name</TableHead>
      <TableHead>Last Name</TableHead>
      <TableHead>Date of Birth</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Phone</TableHead>
      <TableHead>Address</TableHead>
      {token && <TableHead>Actions</TableHead>}
    </TableRow>
  </TableHeader>
  <TableBody>
    {patients.map((patient) => (
      <TableRow key={patient.id}>
        <TableCell>{patient.first_name}</TableCell>
        <TableCell>{patient.last_name}</TableCell>
        {/* <TableCell>{patient.date_of_birth}</TableCell> */}
        <TableCell>{new Date(patient.date_of_birth * 1000).toLocaleDateString()}</TableCell>
        <TableCell>{patient.email}</TableCell>
        <TableCell>{patient.phone}</TableCell>
        <TableCell>{patient.address}</TableCell>

        {token && (
          <TableCell>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer hover:border-blue-500"
                variant="outline"
                size="icon"
                onClick={() => navigate(`/patients/${patient.id}`)}
              >
                <Eye />
              </Button>

              <Button
                className="cursor-pointer hover:border-blue-500"
                variant="outline"
                size="icon"
                onClick={() => navigate(`/patients/${patient.id}/edit`)}
              >
                <Pencil />
              </Button>

              {/* Delete button */}
              <DeleteButton
                resource="patients"
                id={patient.id}
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
