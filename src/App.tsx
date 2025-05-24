import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-6">
                <Dashboard />
              </div>
            </div>
          } />
          <Route path="/employees" element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-6">
                <EmployeeList />
              </div>
            </div>
          } />
          <Route path="/add" element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-6">
                <EmployeeForm onSuccess={() => {}} />
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;