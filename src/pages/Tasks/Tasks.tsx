import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon,
  UserIcon,
  TagIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import clsx from 'clsx';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  tags: string[];
  project: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design',
    status: 'todo',
    priority: 'high',
    assignee: { name: 'Sarah Johnson', avatar: 'SJ' },
    dueDate: '2024-02-10',
    tags: ['design', 'frontend'],
    project: 'Website Redesign',
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate user authentication API with frontend',
    status: 'in-progress',
    priority: 'high',
    assignee: { name: 'Mike Chen', avatar: 'MC' },
    dueDate: '2024-02-12',
    tags: ['backend', 'api'],
    project: 'Website Redesign',
  },
  {
    id: '3',
    title: 'Database Schema Update',
    description: 'Update user table schema to support new fields',
    status: 'review',
    priority: 'medium',
    assignee: { name: 'Emily Davis', avatar: 'ED' },
    dueDate: '2024-02-08',
    tags: ['database', 'backend'],
    project: 'Database Migration',
  },
  {
    id: '4',
    title: 'User Testing Session',
    description: 'Conduct usability testing with 5 target users',
    status: 'done',
    priority: 'low',
    assignee: { name: 'David Wilson', avatar: 'DW' },
    dueDate: '2024-02-05',
    tags: ['testing', 'ux'],
    project: 'Mobile App',
  },
  {
    id: '5',
    title: 'Mobile Responsiveness',
    description: 'Ensure all pages are responsive on mobile devices',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Sarah Johnson', avatar: 'SJ' },
    dueDate: '2024-02-15',
    tags: ['frontend', 'mobile'],
    project: 'Website Redesign',
  },
  {
    id: '6',
    title: 'Performance Optimization',
    description: 'Optimize page load times and reduce bundle size',
    status: 'in-progress',
    priority: 'medium',
    assignee: { name: 'Mike Chen', avatar: 'MC' },
    dueDate: '2024-02-20',
    tags: ['performance', 'frontend'],
    project: 'Website Redesign',
  },
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900/20' },
];

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        'card p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200',
        isDragging && 'opacity-50'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 flex-1">
          {task.title}
        </h4>
        <button className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ml-2">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            <TagIcon className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
        {task.tags.length > 2 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            +{task.tags.length - 2}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium capitalize ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <CalendarDaysIcon className="h-3 w-3 mr-1" />
            {new Date(task.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {task.assignee.avatar}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ColumnProps {
  column: (typeof columns)[0];
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <div className={`rounded-2xl p-4 min-h-96 ${column.color}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h3>
          <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-lg">
            {tasks.length}
          </span>
        </div>
        <button className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    // Find which column the task was dropped into
    let newStatus: Task['status'] = activeTask.status;

    // Check if dropped on a column
    const overColumnId = columns.find((col) => col.id === over.id);
    if (overColumnId) {
      newStatus = overColumnId.id as Task['status'];
    } else {
      // If dropped on another task, find that task's column
      const overTask = tasks.find((task) => task.id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus !== activeTask.status) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === activeTask.id ? { ...task, status: newStatus } : task
        )
      );
    }

    // Handle reordering within the same column
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setTasks((prevTasks) => arrayMove(prevTasks, oldIndex, newIndex));
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject =
      filterProject === 'all' || task.project === filterProject;
    return matchesSearch && matchesProject;
  });

  const projects = Array.from(new Set(tasks.map((task) => task.project)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Organize and track your team's work
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={MagnifyingGlassIcon}
            />
          </div>

          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
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
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.id
            );
            return (
              <Column key={column.id} column={column} tasks={columnTasks} />
            );
          })}
        </div>
      </DndContext>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map((column) => {
          const count = filteredTasks.filter(
            (task) => task.status === column.id
          ).length;
          return (
            <div key={column.id} className="card text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {count}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {column.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
