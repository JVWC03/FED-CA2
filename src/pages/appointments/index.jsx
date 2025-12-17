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
  const [appointments, setAppointments] = useState([]);
  {/* For getting doctor and patient names*/}
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments doctors and patients at the same time
        const [appointmentResponse, doctorResponse, patientResponse] = await Promise.all([
          axios.get("https://ca2-med-api.vercel.app/appointments", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://ca2-med-api.vercel.app/doctors", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://ca2-med-api.vercel.app/patients", { headers: { Authorization: `Bearer ${token}` }})
        ]);

        setAppointments(appointmentResponse.data);
        setDoctors(doctorResponse.data);
        setPatients(patientResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
  }, [token]);

  const onDeleteCallback = (id) => {
    toast.success("Appointment deleted successfully");
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <>
      <Button
        asChild
        variant="primary"
        className="mb-4 mr-auto-block"
      >
        <Link size="sm" to={`/appointments/create`}>Create New Appointment</Link>
      </Button>

      <Table>
        <TableCaption>List of scheduled appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            {token && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => {
            const patient = patients.find(p => p.id === appointment.patient_id);
            const doctor = doctors.find(d => d.id === appointment.doctor_id);

            return (
              <TableRow key={appointment.id}>
                <TableCell>
                  {patient ? `${patient.first_name} ${patient.last_name}` : appointment.patient_id}
                </TableCell>
                <TableCell>
                  {doctor ? `${doctor.first_name} ${doctor.last_name}` : appointment.doctor_id}
                </TableCell>
                {/* Convert UNIX timestamp to readable date */}
                <TableCell>{new Date(appointment.appointment_date * 1000).toLocaleDateString()}</TableCell>

                {token && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        className="cursor-pointer hover:border-blue-500"
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/appointments/${appointment.id}`)}
                      >
                        <Eye />
                      </Button>

                      <Button
                        className="cursor-pointer hover:border-blue-500"
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/appointments/${appointment.id}/edit`)}
                      >
                        <Pencil />
                      </Button>

                    {/* Button used to delete an appointment */}
                      <DeleteButton
                        resource="appointments"
                        id={appointment.id}
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
