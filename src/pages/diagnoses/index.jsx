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
  const [diagnoses, setDiagnoses] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch diagnoses and patients at the same time
        const [diagnosisResponse, patientResponse] = await Promise.all([
          axios.get("https://ca2-med-api.vercel.app/diagnoses", { headers: { Authorization: `Bearer ${token}` }}),
          axios.get("https://ca2-med-api.vercel.app/patients", { headers: { Authorization: `Bearer ${token}` }})
        ]);
        setDiagnoses(diagnosisResponse.data);
        setPatients(patientResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  const onDeleteCallback = (id) => {
    toast.success("Diagnosis deleted successfully");
    setDiagnoses(diagnoses.filter((diagnoses) => diagnoses.id !== id));
  };

  return (
    <>
      <Button 
      asChild 
      variant="primary" 
      className="mb-4 mr-auto-block"
      >
        <Link size="sm" to={`/diagnoses/create`}>Create New Diagnosis</Link>
      </Button>

      <Table>
        <TableCaption>List of diagnoses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Diagnosis Date</TableHead>
            {token && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {diagnoses.map(diagnosis => {
            const patient = patients.find(p => p.id === diagnosis.patient_id);
            return (
              <TableRow key={diagnosis.id}>
                {/* Show patoents full name if loaded, otherwise show ID */}
                <TableCell>{patient ? `${patient.first_name} ${patient.last_name}` : diagnosis.patient_id}</TableCell>
                <TableCell>{diagnosis.condition}</TableCell>
                {/* Convert UNIX timestamp to readable date */}
                <TableCell>{diagnosis.diagnosis_date 
                    ? new Date(diagnosis.diagnosis_date * 1000).toLocaleDateString(): ''}</TableCell>
                {token && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                      className="cursor-pointer hover:border-blue-500"
                      variant="outline" 
                      size="icon" 
                      onClick={() => navigate(`/diagnoses/${diagnosis.id}`)}>
                        <Eye />
                      </Button>
                      <Button 
                    className="cursor-pointer hover:border-blue-500"
                      variant="outline" 
                      size="icon" 
                      onClick={() => navigate(`/diagnoses/${diagnosis.id}/edit`)}>
                        <Pencil />
                      </Button>
                      {/* Button used to delete a diagnosis */}
                      <DeleteButton 
                      resource="diagnoses" 
                      id={diagnosis.id} 
                      onDeleteCallback={onDeleteCallback} />
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
