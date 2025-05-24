import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee';
import { getEmployees, deleteEmployee } from '../services/api';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filtered, setFiltered] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [editEmp, setEditEmp] = useState<Employee | undefined>();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
    setFiltered(res.data);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const lower = text.toLowerCase();
    const result = employees.filter(emp =>
      emp.first_name.toLowerCase().includes(lower) ||
      emp.last_name.toLowerCase().includes(lower) ||
      emp.skills.join(',').toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Manage Employees</h2>

      <input
        type="text"
        placeholder="Search by name or skill..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <EmployeeForm
        selectedEmployee={editEmp}
        onSuccess={() => {
          setEditEmp(undefined);
          fetchEmployees();
        }}
      />

      <div className="mt-6">
        <table className="w-full table-auto border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Skills</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} className="text-center">
                <td className="p-2 border">{emp.first_name}</td>
                <td className="p-2 border">{emp.last_name}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.skills.join(', ')}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    onClick={() => setEditEmp(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    onClick={() => handleDelete(emp.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-gray-500 p-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
