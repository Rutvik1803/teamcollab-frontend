import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  FolderIcon,
  CheckIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  CogIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Tasks', href: '/tasks', icon: CheckIcon },
  { name: 'Employees', href: '/employees', icon: UsersIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'File Storage', href: '/files', icon: DocumentDuplicateIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onClose }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TC</span>
            </div>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              TeamCollab
            </h1>
          </div>
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role || 'employee'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-3 flex-1">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={mobile ? onClose : undefined}
              className={({ isActive }) =>
                clsx(
                  'sidebar-item group flex items-center px-3 py-2 text-sm font-medium rounded-2xl',
                  isActive && 'sidebar-item-active'
                )
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          TeamCollab v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
