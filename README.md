# User Management App

A modern, professional React application for managing users with a clean and intuitive interface.

## 🚀 Features

- **User List**: Display users with search and sorting functionality
- **User Details**: View detailed information for each user
- **Add User**: Create new users with form validation
- **Edit User**: Update existing user information
- **Delete User**: Remove users with confirmation modal
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Custom CSS** - Tailwind-inspired utility classes
- **Local Storage** - Data persistence

## 📋 Requirements Met

✅ **List Users** - Fetch from JSONPlaceholder API  
✅ **Search** - Client-side search by name or email  
✅ **User Details** - Navigate to detailed user view  
✅ **Add User** - Local-only user creation with validation  
✅ **Sorting** - Sort by name, email, or company  
✅ **Redux** - State management with update/delete functionality  
✅ **Responsive** - Mobile-friendly design  

## 🎨 UI Features

- **Professional Design** - Clean, modern interface
- **Smooth Animations** - Hover effects and transitions
- **Modal Confirmations** - Professional delete confirmations
- **Form Validation** - Real-time validation with error messages
- **Loading States** - User feedback during operations
- **Error Handling** - Graceful error boundaries

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── AddUser.tsx     # Add user form
│   ├── EditUser.tsx    # Edit user form
│   ├── UserDetails.tsx # User details view
│   ├── UserList.tsx    # User list with search/sort
│   └── ...
├── store/              # Redux store and slices
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Application constants
└── contexts/           # React contexts
```

## 🔧 Key Features Implementation

### State Management
- Redux Toolkit for centralized state
- Async thunks for API calls
- Local storage integration

### Form Handling
- Custom validation hooks
- Real-time error display
- Optimized re-renders

### UI/UX
- Consistent design system
- Accessible components
- Mobile-first responsive design

### Performance
- Memoized components
- Optimized bundle size
- Efficient state updates

## 📧 Contact

For questions about this implementation, please contact: office@linkplus-it.com

## 📄 License

This project is created as part of a coding challenge for LinkPlus IT.