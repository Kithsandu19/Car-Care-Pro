/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Home Components
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AboutUs from './Components/Home/AboutUs';
import Contact from './Components/Home/ContactUs';
import Register from './Components/Login/Register';
import UserProfile from './Components/pages/UserProfile';
import PrivacyPolicy from './Components/pages/PrivacyPolicy';
import TermsOfUse from './Components/pages/TermsOfUse';

// Admin Components
import AdminDashboard from './Components/Admin/AdminDashboard';
import Dashboard from './Components/Admin/Dashboard';
import UserDetails from './Components/Admin/UserManagement/UserDetails';
import AddUser from './Components/Admin/UserManagement/AddUser';
import UpdateUser from './Components/Admin/UserManagement/UpdateUser';

import { AuthProvider } from './Components/Auth/AuthContext';  // Import AuthProvider
import MakePayment from './Components/pages/MakePayment';
import Employee from './Components/Admin/EmployeeWork/Employees';
import Services from './Components/Admin/Service Booking/Services';
import Vehicles from './Components/Admin/Vehicle-management/Vehicles';
import SpareParts from './Components/Admin/SparepartsInventory/SpareParts';

//Extra Features
import EFpage from './Components/ExtraFeature/EFpage';

//cart page
import Cart from './Components/Home/cart';

import Appointment from './Components/Home/Appointment';

function App() {
  return (
    <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Home Page as the default route */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/appointment" element={<Appointment />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/efpage' element={<EFpage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/makepayment/:id" element={<MakePayment />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admindashboard" element={<AdminDashboard />}>
            {<Route path="dashboard" element={<Dashboard />} /> }
            {/* User Management */}

            <Route path="customer-management" element={<UserDetails />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="update-user/:id" element={<UpdateUser />} />

            <Route path="employee-management" element={<Employee />} />
            <Route path="services-management" element={<Services />} />
            <Route path="vehicle-management" element={<Vehicles />} />
            <Route path="inventory-management" element={<SpareParts />} />


          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;





















