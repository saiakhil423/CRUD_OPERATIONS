// Sidebar.tsx
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white p-4">
      <h1 className="text-xl font-bold mb-10">Employee HRM</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
        <Link to="/employees" className="hover:text-blue-300">Employees</Link>
        <Link to="/logout" className="hover:text-blue-300">Logout</Link>
      </nav>
    </div>
  );
}
