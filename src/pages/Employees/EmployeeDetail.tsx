import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/Common/Button';

// Mock employee data (in real app, this would come from API)
const getEmployeeById = (id: string) => {
  const employees = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@teamcollab.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior UI/UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      status: 'active' as const,
      joinDate: '2023-01-15',
      projects: 8,
      completedTasks: 145,
      bio: 'Experienced UI/UX designer with a passion for creating intuitive and beautiful user interfaces. Specializes in mobile-first design and user research.',
      skills: [
        'UI Design',
        'UX Research',
        'Prototyping',
        'Figma',
        'Adobe Creative Suite',
        'User Testing',
      ],
      recentProjects: [
        {
          name: 'Website Redesign',
          role: 'Lead Designer',
          status: 'In Progress',
        },
        { name: 'Mobile App UI', role: 'UI Designer', status: 'Completed' },
        {
          name: 'Dashboard Overhaul',
          role: 'UX Designer',
          status: 'In Progress',
        },
      ],
      documents: [
        {
          name: 'Resume.pdf',
          type: 'PDF',
          uploadDate: '2023-01-15',
          size: '1.2 MB',
        },
        {
          name: 'Portfolio.zip',
          type: 'ZIP',
          uploadDate: '2023-01-20',
          size: '15.4 MB',
        },
        {
          name: 'Certifications.pdf',
          type: 'PDF',
          uploadDate: '2023-02-01',
          size: '2.1 MB',
        },
      ],
    },
  ];
  return employees.find((emp) => emp.id === id);
};

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

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = id ? getEmployeeById(id) : null;

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Employee not found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The employee you're looking for doesn't exist.
        </p>
        <Link to="/employees" className="mt-4 inline-block">
          <Button variant="outline">Back to Employees</Button>
        </Link>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/employees">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Employees
            </Button>
          </Link>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {getInitials(employee.name)}
                  </span>
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 w-6 h-6 ${
                    statusDots[employee.status]
                  } rounded-full border-4 border-white dark:border-gray-800`}
                ></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {employee.name}
                  </h1>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      statusColors[employee.status]
                    }`}
                  >
                    {employee.status}
                  </span>
                </div>
                <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-1">
                  {employee.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {employee.department} Department
                </p>
                {employee.bio && (
                  <p className="text-gray-700 dark:text-gray-300">
                    {employee.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {employee.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                  <PhoneIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {employee.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                  <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {employee.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                  <CalendarDaysIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Join Date
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {new Date(employee.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-2xl text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Projects
            </h3>
            <div className="space-y-4">
              {employee.recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.role}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Active Projects
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {employee.projects}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Completed Tasks
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {employee.completedTasks}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Department
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {employee.department}
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Documents
              </h3>
              <Button size="sm">
                <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            <div className="space-y-3">
              {employee.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl"
                >
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                    <DocumentDuplicateIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {doc.size} •{' '}
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
