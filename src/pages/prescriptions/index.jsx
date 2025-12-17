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
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch doctors prescriptions and patients at the same time
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prescriptionResponse, patientResponse, doctorResponse] =
          await Promise.all([
            axios.get("https://ca2-med-api.vercel.app/prescriptions", {headers: { Authorization: `Bearer ${token}` }, }),
            axios.get("https://ca2-med-api.vercel.app/patients", {headers: { Authorization: `Bearer ${token}` },}),
            axios.get("https://ca2-med-api.vercel.app/doctors", {headers: { Authorization: `Bearer ${token}` },}),
          ]);
        setPrescriptions(prescriptionResponse.data);
        setPatients(patientResponse.data);
        setDoctors(doctorResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  const onDeleteCallback = (id) => {
    toast.success("Prescription deleted successfully");
    setPrescriptions(prescriptions.filter(prescriptions => prescriptions.id !== id));
  };

  return (
    <>
      <Button 
      asChild 
      variant="primary" 
      className="mb-4 mr-auto-block"
      >
        <Link to={`/prescriptions/create`}>Create New Prescription</Link>
      </Button>

      <Table>
        <TableCaption>List of prescriptions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Medication</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            {token && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {prescriptions.map(prescription => {
            const patient = patients.find(p => p.id === prescription.patient_id);
            const doctor = doctors.find(d => d.id === prescription.doctor_id);

            return (
              <TableRow key={prescription.id}>
                {/* Show patients/doctors full name if loaded, otherwise show ID */}
                <TableCell>
                  {patient ? `${patient.first_name} ${patient.last_name}` : prescription.patient_id}
                </TableCell>

                <TableCell>
                  {doctor ? `${doctor.first_name} ${doctor.last_name}` : prescription.doctor_id}
                </TableCell>

                <TableCell>{prescription.medication}</TableCell>

                {/* Convert UNIX timestamp to readable date */}
                <TableCell>
                    {prescription.start_date
                        ? new Date(prescription.start_date * 1000).toLocaleDateString(): ""}
                </TableCell>

                <TableCell>
                    {prescription.end_date
                        ? new Date(prescription.end_date * 1000).toLocaleDateString(): ""}
                </TableCell>

                {token && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        className="cursor-pointer hover:border-blue-500"
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                      >
                        <Eye />
                      </Button>

                      <Button
                        className="cursor-pointer hover:border-blue-500"
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/prescriptions/${prescription.id}/edit`)}
                      >
                        <Pencil />
                      </Button>

                      {/* Button used to delete a prescription */}
                      <DeleteButton
                        resource="prescriptions"
                        id={prescription.id}
                        onDeleteCallback={onDeleteCallback}
                      />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
