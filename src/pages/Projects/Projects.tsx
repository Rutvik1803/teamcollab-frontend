import React, { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  owner: {
    name: string;
    avatar: string;
  };
  team: Array<{
    name: string;
    avatar: string;
  }>;
  dueDate: string;
  tasksCount: {
    total: number;
    completed: number;
  };
  color: string;
}

// Mock data
const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description:
      'Complete overhaul of the company website with modern design and improved UX',
    status: 'active',
    progress: 75,
    owner: { name: 'Sarah Johnson', avatar: 'SJ' },
    team: [
      { name: 'Mike Chen', avatar: 'MC' },
      { name: 'Emily Davis', avatar: 'ED' },
      { name: 'David Wilson', avatar: 'DW' },
    ],
    dueDate: '2024-02-15',
    tasksCount: { total: 24, completed: 18 },
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    status: 'active',
    progress: 45,
    owner: { name: 'Mike Chen', avatar: 'MC' },
    team: [
      { name: 'Sarah Johnson', avatar: 'SJ' },
      { name: 'Alex Brown', avatar: 'AB' },
    ],
    dueDate: '2024-03-30',
    tasksCount: { total: 32, completed: 14 },
    color: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Database Migration',
    description: 'Migrate from legacy database system to modern cloud solution',
    status: 'on-hold',
    progress: 20,
    owner: { name: 'Emily Davis', avatar: 'ED' },
    team: [{ name: 'David Wilson', avatar: 'DW' }],
    dueDate: '2024-04-20',
    tasksCount: { total: 16, completed: 3 },
    color: 'bg-yellow-500',
  },
  {
    id: '4',
    name: 'API Documentation',
    description: 'Comprehensive documentation for all API endpoints',
    status: 'completed',
    progress: 100,
    owner: { name: 'David Wilson', avatar: 'DW' },
    team: [
      { name: 'Sarah Johnson', avatar: 'SJ' },
      { name: 'Mike Chen', avatar: 'MC' },
    ],
    dueDate: '2024-01-15',
    tasksCount: { total: 12, completed: 12 },
    color: 'bg-purple-500',
  },
];

const statusColors = {
  active:
    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'on-hold':
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
};

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div
            className={`w-4 h-4 rounded-full ${project.color} flex-shrink-0 mt-1`}
          ></div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
        <button className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {project.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ChartBarIcon className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {project.tasksCount.completed}/{project.tasksCount.total}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Tasks
          </span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <UserGroupIcon className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {project.team.length + 1}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Members
          </span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <CalendarDaysIcon className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(project.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Due</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
              statusColors[project.status]
            }`}
          >
            {project.status.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
              <span className="text-white text-xs font-medium">
                {project.owner.avatar}
              </span>
            </div>
            {project.team.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-6 h-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-800"
              >
                <span className="text-white text-xs font-medium">
                  {member.avatar}
                </span>
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                  +{project.team.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track all your team projects
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={MagnifyingGlassIcon}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                  viewMode === 'grid'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === 'list'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <FunnelIcon className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            No projects found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
