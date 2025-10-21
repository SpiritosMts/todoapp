# 📱 Desktop Task Aid - Complete App Recreation Guide

## 🎯 App Overview

**Desktop Task Aid** is a modern task management and productivity application with calendar integration, timer functionality, and a beautiful purple-themed UI.

---

## 🔧 Complete Tech Stack

### **Current Implementation (Windows WPF)**
- **Framework**: WPF (Windows Presentation Foundation)
- **Language**: C# (.NET Framework 4.8)
- **Architecture**: MVVM (Model-View-ViewModel)
- **UI**: XAML markup
- **Data Storage**: JSON files (local file system)
- **External APIs**: Google Calendar API (OAuth 2.0)
- **NuGet Packages**:
  - `Google.Apis.Calendar.v3` (1.69.0.3746)
  - `Google.Apis.Auth` (1.72.0)
  - `Newtonsoft.Json` (13.0.4)
  - `System.Text.Json` (9.0.2)

---

## 🎨 Complete Feature List

### **1. Task Management**
- ✅ Create, read, update, delete tasks
- ✅ Task properties:
  - Task name (string)
  - Due date (DateTime?)
  - Due time (DateTime?)
  - Has reminder (boolean)
  - External ID (string, for Google Calendar sync)
- ✅ Persistent storage (JSON file: `tasks.json`)
- ✅ Real-time auto-save on any change
- ✅ Search/filter tasks
- ✅ Pagination (10/25/50 rows per page)
- ✅ Color-coded reminder tags:
  - Green: Active/upcoming
  - Red: Overdue
  - Yellow: Not set

### **2. Google Calendar Integration**
- ✅ OAuth 2.0 authentication
- ✅ Import events from Google Calendar
- ✅ Sync next month's events
- ✅ Duplicate detection (by External ID or name+date)
- ✅ Credential management (google-credentials.json)
- ✅ Token storage and refresh
- ✅ Error handling for auth failures

### **3. Timer/Productivity Features**
- ✅ Focus timer display (25:00 default)
- ✅ Start/Stop timer controls
- ✅ Reset timer functionality
- ✅ Daily time tracking ("1:30:00 Done Today")
- ⚠️ Note: Timer logic is stubbed (not fully implemented)

### **4. Calendar View**
- ✅ Month calendar display
- ✅ Today highlighting (purple circle)
- ✅ Month navigation (previous/next)
- ✅ Current date display
- ✅ Sync link to Google Calendar

### **5. Daily Task Preview**
- ✅ Show today's tasks (up to 3)
- ✅ Task count display
- ✅ Numbered list format

### **6. Helper Bubble Feature**
- ✅ Toggle on/off via sidebar
- ✅ Visual helper overlay (character animation)
- ✅ Global enable/disable flag

### **7. Theme Support**
- ✅ Light theme (default)
- ✅ Dark theme toggle (UI ready, logic stubbed)
- ✅ Purple accent color (#A855F7)
- ✅ Consistent color system

### **8. UI/UX Features**
- ✅ Modern card-based layout
- ✅ Sidebar navigation (72px)
- ✅ Responsive grid system
- ✅ Smooth hover effects
- ✅ Icon-based actions (edit/delete)
- ✅ Illustrated welcome section
- ✅ Scrollable content area
- ✅ Rounded corners (8px-16px)
- ✅ Subtle shadows for depth

---

## 📋 Prompt to Recreate This App

### **For Web (React + TypeScript)**

```
Create a modern task management web application with the following specifications:

TECH STACK:
- React 18+ with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Zustand or Redux for state management
- React Router for navigation
- date-fns for date handling
- Axios for API calls
- Google Calendar API integration

UI DESIGN:
- Purple accent color (#A855F7)
- Card-based layout with shadows
- 72px sidebar with icon buttons (theme toggle, settings)
- Segoe UI font family
- Light gray background (#F5F5F7)
- White cards with 16px border radius
- Responsive design (min-width: 1024px)

FEATURES TO IMPLEMENT:

1. Task Management:
   - CRUD operations for tasks
   - Fields: name, due date, due time, reminder status, external ID
   - Local storage persistence
   - Search and filter
   - Pagination (10/25/50 per page)
   - Color-coded reminder tags (green/red/yellow)

2. Google Calendar Integration:
   - OAuth 2.0 flow
   - Import next month's events
   - Duplicate detection
   - Sync button

3. Calendar View:
   - Month calendar with today highlighted
   - Navigation arrows
   - Click to select date

4. Daily Tasks:
   - Show today's tasks (max 3)
   - Task count badge

5. Timer:
   - Pomodoro-style timer (25:00 default)
   - Start/pause/reset controls
   - Daily time tracking

6. Welcome Section:
   - Illustrated character with checklist (SVG)
   - Motivational text with purple highlight

7. Theme Toggle:
   - Light/dark mode switch
   - Persist preference

COMPONENT STRUCTURE:
- Sidebar (theme toggle, settings)
- WelcomeSection (illustration, text)
- UpcomingTaskCard (input, timer, buttons)
- CalendarCard (month view, navigation)
- DailyTasksCard (today's tasks)
- TasksTable (full list, search, pagination)
- TaskRow (edit/delete actions)

API ENDPOINTS NEEDED:
- GET /api/tasks - Fetch all tasks
- POST /api/tasks - Create task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task
- GET /api/calendar/sync - Sync Google Calendar
- POST /api/auth/google - OAuth callback

STYLING REQUIREMENTS:
- Use Tailwind utility classes
- Custom purple color in tailwind.config
- Hover states for all interactive elements
- Smooth transitions (200ms)
- Box shadows for cards
- Responsive grid layout

ACCESSIBILITY:
- ARIA labels for icon buttons
- Keyboard navigation
- Focus states
- High contrast text

Please create the complete application with all components, state management, and styling.
```

---

### **For Mobile (React Native)**

```
Create a mobile task management app (iOS/Android) with the following:

TECH STACK:
- React Native with TypeScript
- Expo for development
- React Navigation for routing
- AsyncStorage for local data
- React Native Paper for UI components
- date-fns for dates
- Google Calendar API integration

DESIGN:
- Purple theme (#A855F7)
- Bottom tab navigation
- Card-based UI
- Native calendar picker
- Swipe gestures for delete

SCREENS:
1. Home (welcome, upcoming task, timer)
2. Calendar (month view, daily tasks)
3. Tasks (full list, search, filter)
4. Settings (theme, sync, account)

FEATURES:
- All features from desktop version
- Push notifications for reminders
- Offline mode with sync
- Biometric authentication (optional)
- Dark mode support

Please implement with proper navigation, state management, and native UI components.
```

---

### **For Desktop (Electron)**

```
Create a cross-platform desktop task manager using:

TECH STACK:
- Electron
- React + TypeScript
- Electron Store for persistence
- System tray integration
- Native notifications

FEATURES:
- All web app features
- System tray icon with quick add
- Global keyboard shortcuts
- Auto-launch on startup
- Native menus
- Window state persistence

PLATFORM SUPPORT:
- Windows (MSI installer)
- macOS (DMG)
- Linux (AppImage)

Please create with proper IPC communication, auto-updates, and native integrations.
```

---

### **For Backend (Node.js API)**

```
Create a REST API for the task management app:

TECH STACK:
- Node.js + Express
- TypeScript
- PostgreSQL with Prisma ORM
- JWT authentication
- Google OAuth 2.0
- Redis for caching

ENDPOINTS:

Authentication:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/google (OAuth callback)
- POST /api/auth/refresh
- POST /api/auth/logout

Tasks:
- GET /api/tasks (with pagination, search, filter)
- POST /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/complete

Calendar:
- POST /api/calendar/sync (import from Google)
- GET /api/calendar/events

User:
- GET /api/user/profile
- PUT /api/user/profile
- GET /api/user/stats (time tracking)

DATABASE SCHEMA:
- users (id, email, password_hash, google_id, created_at)
- tasks (id, user_id, name, due_date, due_time, has_reminder, external_id, completed, created_at)
- time_entries (id, user_id, task_id, duration, date)

FEATURES:
- JWT authentication
- Google OAuth integration
- Input validation (Zod)
- Error handling
- Rate limiting
- CORS configuration
- Logging (Winston)

Please implement with proper security, validation, and error handling.
```

---

## 🎨 Design System Specifications

### **Colors**
```css
/* Primary */
--purple-primary: #A855F7;
--purple-dark: #9333EA;
--purple-light: #C084FC;

/* Backgrounds */
--bg-light: #F5F5F7;
--bg-white: #FFFFFF;
--bg-dark: #1B1F2E;

/* Text */
--text-primary: #1B1F2E;
--text-secondary: #6B7280;
--text-subtle: #9CA3AF;

/* Status */
--success: #10B981;
--success-bg: #D1FAE5;
--error: #EF4444;
--error-bg: #FEE2E2;
--warning: #F59E0B;
--warning-bg: #FEF3C7;

/* Borders */
--border: #E5E7EB;
--divider: #D1D5DB;
```

### **Typography**
```css
/* Font Family */
font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;

/* Sizes */
--text-xs: 11px;
--text-sm: 12px;
--text-base: 14px;
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 20px;
--text-3xl: 32px;

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### **Spacing**
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
```

### **Border Radius**
```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### **Shadows**
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 2px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 10px 40px rgba(0,0,0,0.15);
```

---

## 📦 Component Library Equivalents

### **For React/Web:**
- **Buttons**: Use Shadcn/ui Button component
- **Calendar**: React-Calendar or date-fns
- **Table**: TanStack Table (React Table v8)
- **Icons**: Lucide React or Heroicons
- **Forms**: React Hook Form + Zod
- **Modals**: Radix UI Dialog
- **Toast**: Sonner or React Hot Toast

### **For React Native:**
- **UI Kit**: React Native Paper
- **Calendar**: react-native-calendars
- **Icons**: react-native-vector-icons
- **Forms**: React Hook Form
- **Navigation**: React Navigation

---

## 🗂️ File Structure (Recommended)

```
src/
├── components/
│   ├── Sidebar.tsx
│   ├── WelcomeSection.tsx
│   ├── UpcomingTaskCard.tsx
│   ├── CalendarCard.tsx
│   ├── DailyTasksCard.tsx
│   ├── TasksTable.tsx
│   ├── TaskRow.tsx
│   └── ui/ (reusable components)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Tag.tsx
├── hooks/
│   ├── useTasks.ts
│   ├── useCalendar.ts
│   ├── useTimer.ts
│   └── useTheme.ts
├── store/
│   ├── taskStore.ts
│   ├── authStore.ts
│   └── themeStore.ts
├── services/
│   ├── api.ts
│   ├── googleCalendar.ts
│   └── storage.ts
├── types/
│   ├── task.ts
│   ├── calendar.ts
│   └── user.ts
├── utils/
│   ├── dateHelpers.ts
│   ├── validators.ts
│   └── constants.ts
├── pages/
│   ├── Home.tsx
│   ├── Tasks.tsx
│   └── Settings.tsx
└── App.tsx
```

---

## 🔐 Security Considerations

1. **OAuth Credentials**:
   - Never commit credentials to Git
   - Use environment variables
   - Implement PKCE flow for web

2. **Data Storage**:
   - Encrypt sensitive data at rest
   - Use secure storage APIs
   - Implement proper backup

3. **API Security**:
   - JWT with short expiration
   - Refresh token rotation
   - Rate limiting
   - Input sanitization

---

## 🚀 Deployment Options

### **Web App:**
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Railway

### **Mobile App:**
- App Store (iOS)
- Google Play Store (Android)
- TestFlight for beta testing

### **Desktop App:**
- GitHub Releases
- Microsoft Store (Windows)
- Mac App Store
- Snap Store (Linux)

### **Backend:**
- Railway
- Render
- Fly.io
- AWS EC2/ECS
- DigitalOcean

---

## 📊 Database Schema (SQL)

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    display_name VARCHAR(255),
    avatar_url TEXT,
    theme_preference VARCHAR(20) DEFAULT 'light',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(500) NOT NULL,
    due_date DATE,
    due_time TIME,
    has_reminder BOOLEAN DEFAULT FALSE,
    reminder_time TIMESTAMP,
    external_id VARCHAR(255), -- Google Calendar event ID
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Time entries table
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    duration INTEGER NOT NULL, -- in seconds
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_time_entries_user_date ON time_entries(user_id, date);
```

---

## 🎯 MVP vs Full Feature Set

### **MVP (Minimum Viable Product)**
- ✅ Basic CRUD for tasks
- ✅ Local storage only
- ✅ Simple calendar view
- ✅ Basic timer
- ✅ Light theme only

### **Full Feature Set**
- ✅ Google Calendar sync
- ✅ Cloud storage/sync
- ✅ Advanced filtering
- ✅ Time tracking analytics
- ✅ Dark theme
- ✅ Notifications
- ✅ Collaboration features
- ✅ Mobile apps
- ✅ Offline mode

---

## 📱 Alternative Tech Stacks

### **Option 1: Next.js Full Stack**
- Next.js 14+ (App Router)
- Prisma + PostgreSQL
- NextAuth.js for auth
- Vercel deployment
- All-in-one solution

### **Option 2: Flutter (Cross-platform)**
- Flutter for mobile + desktop
- Dart language
- Firebase backend
- Single codebase for all platforms

### **Option 3: Tauri (Lightweight Desktop)**
- Tauri (Rust + Web)
- React/Vue/Svelte frontend
- Smaller bundle size than Electron
- Better performance

### **Option 4: Progressive Web App**
- Next.js PWA
- Service workers for offline
- Installable on mobile/desktop
- No app store needed

---

## 🎨 Figma Design File Structure

If recreating in Figma:
1. **Pages**:
   - Design System (colors, typography, components)
   - Desktop Views
   - Mobile Views
   - Component Library

2. **Frames**:
   - 1280x900 (Desktop)
   - 375x812 (Mobile)

3. **Components**:
   - Buttons (primary, secondary, circular)
   - Cards
   - Input fields
   - Tags
   - Icons
   - Calendar cells

---

## 📝 Summary

This app is a **modern task management and productivity tool** with:
- Beautiful purple-themed UI
- Google Calendar integration
- Timer/productivity tracking
- MVVM architecture
- Local JSON storage
- OAuth 2.0 authentication

**To recreate**: Use the prompts above for your preferred platform (Web/Mobile/Desktop), implement the features listed, follow the design system, and integrate Google Calendar API.

**Estimated Development Time**:
- MVP: 2-3 weeks
- Full feature set: 6-8 weeks
- With team: 3-4 weeks

Good luck building! 🚀
