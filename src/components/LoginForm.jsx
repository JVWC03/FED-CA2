import { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState(""); // optional for showing errors

  const handleForm = e => {   
      setForm({...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
      e.preventDefault();
      setError(""); // reset error message

      const fetchLogin = async () => {
          const options = {
              method: "POST",
              url: "https://ca2-med-api.vercel.app/login", // <--- changed URL
              data: form
          };

          try {
              let response = await axios.request(options);
              console.log(response.data);

              onLogin(true, response.data.token); // token returned from API
          } catch (err) {
              console.log(err.response?.data || err.message);
              setError("Login failed. Please check your credentials."); // optional
          }
      };

      fetchLogin();
      console.log(form);
  };

  return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitForm}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleForm}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  onChange={handleForm}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={submitForm} type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
  );
}
