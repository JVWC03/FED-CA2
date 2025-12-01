import { Link } from 'react-router';

export default function Navbar({ loggedIn }) {
  return (
    <nav className="flex items-center gap-4 p-4 border-b">
      <Link to="/" className="text-base font-medium hover:underline">
        Home
      </Link>

      {loggedIn ? (
        <Link to="/dashboard" className="text-base font-medium hover:underline">
          Dashboard
        </Link>
      ) : (
        <Link to="/login" className="text-base font-medium hover:underline">
          Login
        </Link>
      )}
    </nav>
  );
}
