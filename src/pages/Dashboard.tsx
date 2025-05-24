
import { useState, useEffect } from 'react';
import { fetchEmployeeStats, fetchLocationStats, fetchRecentHires } from '../services/api';
import { PieChart } from '../components/PieChart';
import { BarChart } from '../components/BarChart';
import type { Employee, LocationStat, EmployeeStats } from '../types/employee';

const Dashboard = () => {
  const [stats, setStats] = useState<EmployeeStats>({
    totalEmployees: 0,
    avgEmployeeTenure: 0,
    skillsTracked: 0
  });
  const [locationStats, setLocationStats] = useState<LocationStat[]>([]);
  const [recentHires, setRecentHires] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, locRes, hiresRes] = await Promise.all([
          fetchEmployeeStats(),
          fetchLocationStats(),
          fetchRecentHires()
        ]);
        
        setStats(statsRes);
        setLocationStats(locRes);
        // Ensure recentHires is always an array
        setRecentHires(Array.isArray(hiresRes) ? hiresRes : []);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="justify-center items-center w-screen h-screen bg-gray-100">
    <div className="p-6" >
      <h1 className="text-3xl font-bold text-blue-700 mb-4">HR Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 shadow rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800">Total Employees</h2>
          <p className="text-2xl text-blue-600 font-bold">{stats.totalEmployees}</p>
        </div>

        <div className="bg-white p-4 shadow rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800">Avg Tenure</h2>
          <p className="text-2xl text-blue-600 font-bold">{stats.avgEmployeeTenure} yrs</p>
        </div>

        <div className="bg-white p-4 shadow rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800">Skills Tracked</h2>
          <p className="text-2xl text-blue-600 font-bold">{stats.skillsTracked}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 shadow rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Distribution by Country</h2>
          <div className="h-64">
            <PieChart data={locationStats} />
          </div>
        </div>
        
        <div className="bg-white p-4 shadow rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hiring Trend (Last 10 Employees)</h2>
          <div className="h-64">
            <BarChart data={recentHires} />
          </div>
        </div>
      </div>

      {/* Recent Hires */}
      <div className="bg-white p-4 shadow rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Hires</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentHires.map((hire) => (
                <tr key={hire.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {hire.first_name} {hire.last_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hire.country || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hire.created_at ? new Date(hire.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {hire.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                      {hire.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          +{hire.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;