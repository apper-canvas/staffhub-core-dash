import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '@/store/store';
import AuthProvider from '@/components/AuthProvider';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Employees from '@/components/pages/Employees';
import Departments from '@/components/pages/Departments';
import Tasks from '@/components/pages/Tasks';
import Reviews from '@/components/pages/Reviews';
import Calendar from '@/components/pages/Calendar';
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Callback from '@/components/pages/Callback';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="employees" element={<Employees />} />
                <Route path="departments" element={<Departments />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="calendar" element={<Calendar />} />
              </Route>
            </Routes>
            
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              style={{ zIndex: 9999 }}
            />
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;