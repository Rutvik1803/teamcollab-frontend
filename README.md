# TeamCollab Frontend

A modern, enterprise-grade React frontend for TeamCollab - a comprehensive team collaboration platform.

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional, and minimal design
- **Dark Mode Support**: Toggle between light and dark themes
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Consistent Styling**: Professional color palette with blue primary and gray secondary colors
- **Smooth Animations**: Subtle transitions and hover effects throughout

## 🚀 Tech Stack

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **@dnd-kit** for drag-and-drop functionality
- **Heroicons** for consistent iconography
- **React Hot Toast** for notifications
- **Framer Motion** for animations

## 📋 Features

### Authentication
- Login and Register pages with form validation
- Token-based authentication
- Google OAuth integration ready
- Password visibility toggle

### Dashboard
- Personalized welcome message
- Statistics cards with trend indicators
- Interactive charts (area, bar, pie)
- Recent activity feed
- Team distribution metrics

### Projects Management
- Project cards with progress tracking
- Team member avatars
- Status indicators (Active, Completed, On Hold)
- Search and filter functionality
- Grid and list view modes

### Task Management (Kanban Board)
- Drag-and-drop task cards between columns
- Task priority levels (High, Medium, Low)
- Assignee information
- Due dates and tags
- Project association
- Real-time column statistics

### Employee Directory
- Employee cards with contact information
- Status indicators (Online, Away, Offline)
- Department and role filtering
- Search functionality
- Detailed employee profiles with:
  - Personal information
  - Skills and competencies
  - Recent projects
  - Document management

### Chat System
- Real-time messaging interface
- Direct and group conversations
- Online status indicators
- Message timestamps
- Emoji support ready
- Conversation search

### File Storage
- File upload and management
- File type icons and previews
- Project association
- Search and filtering
- Grid and list views
- File actions (View, Download, Delete)

### Analytics Dashboard
- Productivity trends
- Task distribution charts
- Project progress tracking
- Team performance metrics
- Top performers leaderboard
- Quick statistics overview

### Settings Panel
- **Profile Management**: Update personal information and avatar
- **Security**: Password management and 2FA setup
- **Notifications**: Customizable notification preferences
- **Preferences**: Theme toggle, language, and timezone settings
- **Team Management**: Role-based team member management (Admin only)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Common/          # Reusable UI components
│   └── Layout/          # Layout components (Sidebar, Topbar)
├── contexts/            # React contexts (Auth, Theme)
├── pages/              # Page components
│   ├── Auth/           # Login, Register
│   ├── Dashboard/      # Main dashboard
│   ├── Projects/       # Projects management
│   ├── Tasks/          # Kanban board
│   ├── Employees/      # Employee directory
│   ├── Chat/           # Messaging system
│   ├── FileStorage/    # File management
│   ├── Analytics/      # Analytics dashboard
│   └── Settings/       # Settings panel
├── App.tsx             # Main app component
├── index.tsx          # Entry point
└── index.css          # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue-700 (#1d4ed8)
- **Secondary**: Gray-500 (#6b7280)
- **Background**: Gray-50 (light) / Gray-900 (dark)
- **Text**: Gray-900 (light) / Gray-50 (dark)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)

### Components
- **Rounded Corners**: 2xl (16px)
- **Shadows**: Subtle md shadows
- **Transitions**: 200ms ease-in-out
- **Hover Effects**: Scale and shadow transforms

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### TailwindCSS
The project uses a custom TailwindCSS configuration with:
- Extended color palette for primary and secondary colors
- Inter font family integration
- Dark mode class strategy
- Custom transition utilities

### Authentication
The app includes token-based authentication with:
- Automatic token storage in localStorage
- Axios interceptors for API requests
- Protected route handling
- User context management

## 📱 Responsive Design

- **Mobile First**: Designed for mobile and scaled up
- **Breakpoints**: 
  - sm: 640px (tablet)
  - md: 768px (small desktop)
  - lg: 1024px (desktop)
  - xl: 1280px (large desktop)

## 🎯 Key Features Implemented

✅ Modern, professional UI design  
✅ Dark/light theme toggle  
✅ Fully responsive layout  
✅ Authentication flow  
✅ Dashboard with charts  
✅ Project management  
✅ Kanban task board with drag-and-drop  
✅ Employee directory  
✅ Chat interface  
✅ File storage system  
✅ Analytics dashboard  
✅ Comprehensive settings panel  
✅ Role-based access control  
✅ Search and filtering  
✅ Form validation  
✅ Loading states and error handling  

## 🔗 Backend Integration

The frontend is designed to work with a REST API backend. Key integration points:

- Authentication endpoints (`/auth/login`, `/auth/register`, `/auth/me`)
- User management (`/users`)
- Project management (`/projects`)
- Task management (`/tasks`)
- File uploads (`/files`)
- Analytics data (`/analytics`)

## 🧪 Development

The project includes:
- TypeScript for type safety
- ESLint configuration
- Component-based architecture
- Custom hooks for common functionality
- Context providers for global state
- Reusable utility classes

## 📄 License

This project is created for demonstration purposes only. All rights reserved.

---

**TeamCollab** - Modern Enterprise Collaboration Platform
