import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { createEmployee, updateEmployee } from '../services/api';
import type { Employee } from '../types/employee';

type Props = {
  selectedEmployee?: Employee;
  onSuccess: () => void;
};
const initialFormState: Employee = {
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  gender: 'M',
  date_of_birth: '',
  address: '',
  country: '',
  city: '',
  skills: [],
};

const EmployeeForm = ({ selectedEmployee, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Employee>(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    } else {
      setFormData(initialFormState);
    }
    setErrors({}); // Clear errors when selectedEmployee changes
  }, [selectedEmployee]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'skills') {
      setFormData({ ...formData, skills: value.split(',').map((s) => s.trim()).filter((s) => s) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error for this field when user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      if (selectedEmployee?.id) {
        console.log('Updating employee...', formData);
        await updateEmployee(selectedEmployee.id, formData);
      } else {
        console.log('Creating employee...', formData);
        await createEmployee(formData);
      }
      onSuccess();
      setFormData(initialFormState);
    } catch (err: any) {
      console.error('❌ Failed to submit:', err.message);
      if (err.response) {
        const errorData = err.response.data;
        const newErrors: { [key: string]: string } = {};
        // Handle field-specific errors (e.g., {email: ["This field must be unique."]})
        Object.keys(errorData).forEach((key) => {
          if (Array.isArray(errorData[key])) {
            newErrors[key] = errorData[key][0]; // Take first error message
          } else {
            newErrors[key] = errorData[key];
          }
        });
        setErrors(newErrors);
        console.error('🔻 Response Data:', errorData);
        console.error('🔻 Status:', err.response.status);
        console.error('🔻 Headers:', err.response.headers);
      } else if (err.request) {
        setErrors({ general: 'No response received from the server.' });
        console.error('❌ No response received. Request:', err.request);
      } else {
        setErrors({ general: 'Error setting up the request.' });
        console.error('❌ Error setting up request:', err.message);
      }
    }
  };

  return (
    <div className="justify-center items-center w-screen bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow border"
    >
      {errors.general && (
        <div className="col-span-2 text-red-600 bg-red-100 p-2 rounded">
          {errors.general}
        </div>
      )}
      <div>
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="p-2 border rounded w-full"
        />
        {errors.first_name && (
          <p className="text-red-600 text-sm">{errors.first_name}</p>
        )}
      </div>
      <div>
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="p-2 border rounded w-full"
        />
        {errors.last_name && (
          <p className="text-red-600 text-sm">{errors.last_name}</p>
        )}
      </div>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="p-2 border rounded w-full"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email}</p>
        )}
      </div>
      <div>
        <input
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="p-2 border rounded w-full"
        />
        {errors.mobile && (
          <p className="text-red-600 text-sm">{errors.mobile}</p>
        )}
      </div>
      <div>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-sm">{errors.gender}</p>
        )}
      </div>
      <div>
        <input
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        {errors.date_of_birth && (
          <p className="text-red-600 text-sm">{errors.date_of_birth}</p>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="p-2 border rounded w-full"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address}</p>
        )}
      </div>
      <div>
        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="p-2 border rounded w-full"
        />
        {errors.country && (
          <p className="text-red-600 text-sm">{errors.country}</p>
        )}
      </div>
      <div>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="p-2 border rounded w-full"
        />
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city}</p>
        )}
      </div>
      <div className="col-span-2">
        <input
          name="skills"
          value={formData.skills.join(', ')}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="p-2 border rounded w-full"
        />
        {errors.skills && (
          <p className="text-red-600 text-sm">{errors.skills}</p>
        )}
      </div>
      <button
        type="submit"
        className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {selectedEmployee ? 'Update' : 'Add'} Employee
      </button>
    </form>
    </div>
  );
};

export default EmployeeForm;