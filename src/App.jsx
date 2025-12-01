import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

import Home from '@/pages/Home';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  const onLogin = (auth, token) => {
    setLoggedIn(auth);
    if (auth) {
      localStorage.setItem('token', token);
    } else {
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

          <div className="flex flex-1 flex-col p-6">
            <Routes>
              <Route
                path="/"
                element={<Home onLogin={onLogin} loggedIn={loggedIn} />}
              />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Router>
  );
}
