import LoginForm from "@/components/LoginForm";

export default function Home({ loggedIn, onLogin }) {
  return (
    <>
      <h1>Welcome to the Medical Clinic</h1>

      {!loggedIn && <LoginForm onLogin={onLogin} />}
    </>
  );
};
