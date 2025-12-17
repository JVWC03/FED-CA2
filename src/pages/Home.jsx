import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import LoginForm from "@/components/LoginForm";

export default function Home({ loggedIn, onLogin }) {
  const navigate = useNavigate();

  const links = [
    { title: "Doctors", path: "/doctors" },
    { title: "Patients", path: "/patients" },
    { title: "Appointments", path: "/appointments" },
    { title: "Diagnoses", path: "/diagnoses" },
    { title: "Prescriptions", path: "/prescriptions" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Welcome to Bray Medical Clinic
      </h1>

      <h2 className="text-xl font-medium mb-6 text-center text-gray-600">
          Select an option to get started
      </h2>


      {/* Show login form if user is not logged in */}
      {!loggedIn && (
        <div className="mb-10 w-full max-w-md">
          <LoginForm onLogin={onLogin} />
        </div>
      )}

      {/* Navigation cards */}
      {loggedIn && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">

          {links.map((link) => (
            <Card
              key={link.title}
              onClick={() => navigate(link.path)}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="flex items-center justify-center h-32">
                <h2 className="text-xl font-semibold">
                  {link.title}
                </h2>
              </CardContent>
            </Card>
          ))}

        </div>
      )}
    </div>
  );
}
