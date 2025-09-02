import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  avatar?: string;
  status: 'active' | 'away' | 'offline';
  joinDate: string;
  projects: number;
  completedTasks: number;
}

const employees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@teamcollab.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior UI/UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    status: 'active',
    joinDate: '2023-01-15',
    projects: 8,
    completedTasks: 145,
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@teamcollab.com',
    phone: '+1 (555) 234-5678',
    role: 'Full Stack Developer',
    department: 'Engineering',
    location: 'New York, NY',
    status: 'active',
    joinDate: '2022-11-20',
    projects: 12,
    completedTasks: 198,
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@teamcollab.com',
    phone: '+1 (555) 345-6789',
    role: 'Database Administrator',
    department: 'Engineering',
    location: 'Austin, TX',
    status: 'away',
    joinDate: '2023-03-10',
    projects: 6,
    completedTasks: 87,
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@teamcollab.com',
    phone: '+1 (555) 456-7890',
    role: 'Technical Writer',
    department: 'Documentation',
    location: 'Seattle, WA',
    status: 'offline',
    joinDate: '2023-02-01',
    projects: 4,
    completedTasks: 63,
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@teamcollab.com',
    phone: '+1 (555) 567-8901',
    role: 'Product Manager',
    department: 'Product',
    location: 'Los Angeles, CA',
    status: 'active',
    joinDate: '2022-09-15',
    projects: 15,
    completedTasks: 234,
  },
  {
    id: '6',
    name: 'Jessica Lee',
    email: 'jessica.lee@teamcollab.com',
    phone: '+1 (555) 678-9012',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    location: 'Chicago, IL',
    status: 'active',
    joinDate: '2023-04-05',
    projects: 7,
    completedTasks: 112,
  },
];

const statusColors = {
  active:
    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  away: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  offline: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
};

const statusDots = {
  active: 'bg-green-400',
  away: 'bg-yellow-400',
  offline: 'bg-gray-400',
};

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Link to={`/employees/${employee.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {getInitials(employee.name)}
                </span>
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 ${
                  statusDots[employee.status]
                } rounded-full border-2 border-white dark:border-gray-800`}
              ></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {employee.name}
              </h3>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {employee.role}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee.department}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
              statusColors[employee.status]
            }`}
          >
            {employee.status}
          </span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{employee.location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {employee.projects}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Projects
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {employee.completedTasks}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Tasks
            </div>
          </div>
        </div>

        {/* Join Date */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Joined{' '}
              {new Date(employee.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus =
      filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employees
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your team members and their information
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button>
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {employees.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Employees
          </div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {employees.filter((emp) => emp.status === 'active').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {employees.filter((emp) => emp.status === 'away').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Away</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600">
            {employees.filter((emp) => emp.status === 'offline').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Offline
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={MagnifyingGlassIcon}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="card text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <MagnifyingGlassIcon className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            No employees found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Employees;
