import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary";
import { NotificationProvider } from "./contexts/NotificationContext";
import Header from "./components/Header";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<UserList />} />
                  <Route path="/user/:id" element={<UserDetails />} />
                  <Route path="/add-user" element={<AddUser />} />
                  <Route path="/edit-user/:id" element={<EditUser />} />
                </Routes>
              </main>
            </div>
          </Router>
        </NotificationProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
