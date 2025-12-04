import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';

// Doctor pages
import DoctorsIndex from '@/pages/doctors/Index';
import DoctorsShow from '@/pages/doctors/Show';
import DoctorsCreate from '@/pages/doctors/Create';
import DoctorsEdit from '@/pages/doctors/Edit';

// Patient pages
import PatientsIndex from '@/pages/patients/Index';
import PatientsCreate from '@/pages/patients/Create';
import PatientsEdit from '@/pages/patients/Edit';
import PatientsShow from '@/pages/patients/Show';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token){
      setLoggedIn(true);
    }
  }, []);

  const onLogin = (auth, token) => {
    setLoggedIn(auth);

    if(auth){
      localStorage.setItem('token', token)
    }
    else {
      localStorage.removeItem('token');
    }
  };

  return (
    <Router>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" loggedIn={loggedIn} onLogin={onLogin} />
        <SidebarInset>
          <SiteHeader />

          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mx-6">
                {/* Main content */}
                <Routes>
                  <Route
                    path="/"
                    element={<Home onLogin={onLogin} loggedIn={loggedIn} />}
                  />

                  {/* Doctor routes */}
                  <Route path="/doctors" element={<DoctorsIndex />} />
                  <Route path="/doctors/:id" element={<DoctorsShow loggedIn={loggedIn} />} />
                  <Route path="/doctors/create" element={<DoctorsCreate />} />
                  <Route path="/doctors/:id/edit" element={<DoctorsEdit />} />

                  {/* Patient routes */}
                  <Route path="/patients" element={<PatientsIndex />} />
                  <Route path="/patients/create" element={<PatientsCreate />} />
                  <Route path="/patients/:id/edit" element={<PatientsEdit />} />
                  <Route path="/patients/:id" element={<PatientsShow loggedIn={loggedIn} />} />
                </Routes>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Router>
  );
}
