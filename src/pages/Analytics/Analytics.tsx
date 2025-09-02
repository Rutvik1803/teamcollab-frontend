import React, { useState } from 'react';
import {
  ChartBarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data
const productivityData = [
  { name: 'Mon', tasks: 24, hours: 8.5 },
  { name: 'Tue', tasks: 18, hours: 7.2 },
  { name: 'Wed', tasks: 32, hours: 9.1 },
  { name: 'Thu', tasks: 28, hours: 8.8 },
  { name: 'Fri', tasks: 22, hours: 7.5 },
  { name: 'Sat', tasks: 8, hours: 3.2 },
  { name: 'Sun', tasks: 5, hours: 2.1 },
];

const projectProgressData = [
  { name: 'Website Redesign', progress: 75, total: 100 },
  { name: 'Mobile App', progress: 45, total: 100 },
  { name: 'Database Migration', progress: 20, total: 100 },
  { name: 'API Documentation', progress: 100, total: 100 },
];

const teamPerformanceData = [
  { name: 'Design', completed: 45, assigned: 60, color: '#1d4ed8' },
  { name: 'Frontend', completed: 38, assigned: 50, color: '#059669' },
  { name: 'Backend', completed: 25, assigned: 35, color: '#dc2626' },
  { name: 'QA', completed: 18, assigned: 25, color: '#7c3aed' },
];

const taskDistributionData = [
  { name: 'Completed', value: 145, color: '#10b981' },
  { name: 'In Progress', value: 32, color: '#3b82f6' },
  { name: 'To Do', value: 28, color: '#f59e0b' },
  { name: 'Blocked', value: 5, color: '#ef4444' },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}) => {
  return (
    <div className="card">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
              </div>
              <div
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  changeType === 'increase'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                <ArrowTrendingUpIcon
                  className={`self-center flex-shrink-0 h-4 w-4 mr-1 ${
                    changeType === 'decrease' ? 'rotate-180' : ''
                  }`}
                />
                {change}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Task Completion Rate',
      value: '87%',
      change: '+2.1%',
      changeType: 'increase' as const,
      icon: ChartBarIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Average Response Time',
      value: '2.4h',
      change: '-0.5h',
      changeType: 'increase' as const,
      icon: ClockIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Active Team Members',
      value: 23,
      change: '+3',
      changeType: 'increase' as const,
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Project Velocity',
      value: '94',
      change: '+12',
      changeType: 'increase' as const,
      icon: ArrowTrendingUpIcon,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track team performance and project insights
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Productivity Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Weekly Productivity
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#1d4ed8"
                  strokeWidth={3}
                  name="Tasks Completed"
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Hours Worked"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Task Distribution
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Project Progress
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectProgressData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#6b7280"
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="progress" fill="#1d4ed8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Team Performance
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="assigned"
                  fill="#e5e7eb"
                  name="Assigned"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="completed"
                  fill="#1d4ed8"
                  name="Completed"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top Performers */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Top Performers
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', tasks: 23, avatar: 'SJ' },
              { name: 'Mike Chen', tasks: 19, avatar: 'MC' },
              { name: 'Emily Davis', tasks: 17, avatar: 'ED' },
              { name: 'David Wilson', tasks: 14, avatar: 'DW' },
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {performer.avatar}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performer.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {performer.tasks} tasks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Milestones
          </h3>
          <div className="space-y-4">
            {[
              {
                milestone: 'Website Redesign 75% Complete',
                date: '2 hours ago',
              },
              { milestone: 'Mobile App Beta Released', date: '1 day ago' },
              { milestone: 'API Documentation Finished', date: '2 days ago' },
              { milestone: 'Database Migration Started', date: '3 days ago' },
            ].map((item, index) => (
              <div key={index} className="border-l-2 border-primary-500 pl-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.milestone}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Projects On Track
              </span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Team Satisfaction
              </span>
              <span className="text-sm font-medium text-blue-600">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Budget Utilization
              </span>
              <span className="text-sm font-medium text-yellow-600">67%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Code Quality Score
              </span>
              <span className="text-sm font-medium text-purple-600">A+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
