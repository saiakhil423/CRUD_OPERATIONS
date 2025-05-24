// types/employee.ts
export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  gender: string;
  date_of_birth: string;
  address: string;
  country: string;
  city: string;
  skills: string[];
  created_at?: string;
}

export interface LocationStat {
  name: string;
  value: number;
}

export interface EmployeeStats {
  totalEmployees: number;
  avgEmployeeTenure: number;
  skillsTracked: number;
}