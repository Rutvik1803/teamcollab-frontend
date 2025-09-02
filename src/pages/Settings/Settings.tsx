import React, { useState } from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BellIcon,
  EyeIcon,
  EyeSlashIcon,
  SunIcon,
  MoonIcon,
  ShieldCheckIcon,
  UsersIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

interface SettingsTabProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  id,
  label,
  icon: Icon,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-colors ${
        active
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </button>
  );
};

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: user?.department || '',
    bio: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    marketing: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'preferences', label: 'Preferences', icon: CogIcon },
    { id: 'team', label: 'Team Management', icon: UsersIcon },
  ];

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profileData);
    // Handle profile update
  };

  const handlePasswordUpdate = () => {
    console.log('Updating password');
    // Handle password update
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Profile Information
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update your personal information and profile details.
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <Button size="sm">Change Avatar</Button>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Upload a new profile picture
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          value={profileData.name}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, name: e.target.value }))
          }
          icon={UserIcon}
        />
        <Input
          label="Email"
          type="email"
          value={profileData.email}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, email: e.target.value }))
          }
          icon={EnvelopeIcon}
        />
        <Input
          label="Phone"
          value={profileData.phone}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
        <Input
          label="Department"
          value={profileData.department}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, department: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bio
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, bio: e.target.value }))
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleProfileUpdate}>Save Changes</Button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Security Settings
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your password and security preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <Input
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            icon={LockClosedIcon}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            icon={LockClosedIcon}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <Input
          label="Confirm New Password"
          type="password"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          icon={LockClosedIcon}
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Two-Factor Authentication
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Add an extra layer of security to your account.
        </p>
        <Button variant="outline" size="sm">
          Enable 2FA
        </Button>
      </div>

      <div className="flex justify-end">
        <Button onClick={handlePasswordUpdate}>Update Password</Button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Notification Preferences
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose how you want to be notified about updates and activities.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            key: 'email',
            label: 'Email Notifications',
            description: 'Get notified via email for important updates',
          },
          {
            key: 'push',
            label: 'Push Notifications',
            description: 'Receive push notifications on your devices',
          },
          {
            key: 'desktop',
            label: 'Desktop Notifications',
            description: 'Show desktop notifications while using the app',
          },
          {
            key: 'marketing',
            label: 'Marketing Emails',
            description: 'Receive product updates and marketing communications',
          },
        ].map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {option.label}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={
                  notifications[option.key as keyof typeof notifications]
                }
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    [option.key]: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Preferences
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize your TeamCollab experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
          <div className="flex items-center space-x-3">
            {theme === 'light' ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-blue-500" />
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Theme
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current theme: {theme === 'light' ? 'Light' : 'Dark'}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Language
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your preferred language
            </p>
          </div>
          <select className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Timezone
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Set your local timezone
            </p>
          </div>
          <select className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>UTC-8 (PST)</option>
            <option>UTC-5 (EST)</option>
            <option>UTC+0 (GMT)</option>
            <option>UTC+1 (CET)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Team Management
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage team members and their roles.
        </p>
      </div>

      {user?.role === 'admin' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Team Members
            </h4>
            <Button size="sm">
              <UsersIcon className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: 'Sarah Johnson',
                email: 'sarah@teamcollab.com',
                role: 'Admin',
                avatar: 'SJ',
              },
              {
                name: 'Mike Chen',
                email: 'mike@teamcollab.com',
                role: 'Manager',
                avatar: 'MC',
              },
              {
                name: 'Emily Davis',
                email: 'emily@teamcollab.com',
                role: 'Employee',
                avatar: 'ED',
              },
              {
                name: 'David Wilson',
                email: 'david@teamcollab.com',
                role: 'Employee',
                avatar: 'DW',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {member.avatar}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    defaultValue={member.role.toLowerCase()}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            Access Restricted
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You don't have permission to manage team members.
          </p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'team':
        return renderTeamTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card space-y-2">
            {tabs.map((tab) => (
              <SettingsTab
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
