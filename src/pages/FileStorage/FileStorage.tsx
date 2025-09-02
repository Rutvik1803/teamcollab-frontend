import React, { useState } from 'react';
import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'other';
  size: string;
  uploadDate: string;
  uploader: {
    name: string;
    avatar: string;
  };
  project?: string;
}

const files: FileItem[] = [
  {
    id: '1',
    name: 'Project Requirements.pdf',
    type: 'document',
    size: '2.4 MB',
    uploadDate: '2024-01-20T10:30:00Z',
    uploader: { name: 'Sarah Johnson', avatar: 'SJ' },
    project: 'Website Redesign',
  },
  {
    id: '2',
    name: 'Homepage Mockup.png',
    type: 'image',
    size: '1.8 MB',
    uploadDate: '2024-01-19T14:20:00Z',
    uploader: { name: 'Mike Chen', avatar: 'MC' },
    project: 'Website Redesign',
  },
  {
    id: '3',
    name: 'Demo Video.mp4',
    type: 'video',
    size: '45.2 MB',
    uploadDate: '2024-01-18T09:15:00Z',
    uploader: { name: 'Emily Davis', avatar: 'ED' },
    project: 'Mobile App',
  },
  {
    id: '4',
    name: 'Assets.zip',
    type: 'archive',
    size: '12.7 MB',
    uploadDate: '2024-01-17T16:45:00Z',
    uploader: { name: 'David Wilson', avatar: 'DW' },
    project: 'Website Redesign',
  },
];

const getFileIcon = (type: FileItem['type']) => {
  switch (type) {
    case 'document':
      return DocumentIcon;
    case 'image':
      return PhotoIcon;
    case 'video':
      return VideoCameraIcon;
    case 'archive':
      return ArchiveBoxIcon;
    default:
      return DocumentIcon;
  }
};

const getFileColor = (type: FileItem['type']) => {
  switch (type) {
    case 'document':
      return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    case 'image':
      return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
    case 'video':
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
    case 'archive':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

interface FileCardProps {
  file: FileItem;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const IconComponent = getFileIcon(file.type);

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* File Icon */}
      <div className="flex items-center justify-center mb-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getFileColor(
            file.type
          )}`}
        >
          <IconComponent className="h-8 w-8" />
        </div>
      </div>

      {/* File Info */}
      <div className="text-center mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
          {file.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{file.size}</p>
      </div>

      {/* Upload Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {file.uploader.avatar}
            </span>
          </div>
          <span>{file.uploader.name}</span>
        </div>
        <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
      </div>

      {file.project && (
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
            {file.project}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" className="flex-1">
          <EyeIcon className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
          Download
        </Button>
        <Button size="sm" variant="outline">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const FileStorage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesProject =
      filterProject === 'all' || file.project === filterProject;
    return matchesSearch && matchesType && matchesProject;
  });

  const projects = Array.from(
    new Set(files.map((file) => file.project).filter(Boolean))
  );
  const totalSize = files.reduce((acc, file) => {
    const size = parseFloat(file.size.split(' ')[0]);
    const unit = file.size.split(' ')[1];
    const bytes = unit === 'GB' ? size * 1024 : size;
    return acc + bytes;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            File Storage
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and organize your team's files
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button>
            <CloudArrowUpIcon className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {files.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Files
          </div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {files.filter((f) => f.type === 'document').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Documents
          </div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {files.filter((f) => f.type === 'image').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Images</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {totalSize.toFixed(1)} MB
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Size
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={MagnifyingGlassIcon}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="archive">Archives</option>
              </select>
            </div>

            <select
              className="border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>

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

      {/* Files Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}
      >
        {filteredFiles.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="card text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <DocumentIcon className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            No files found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default FileStorage;
