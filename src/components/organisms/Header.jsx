import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '@/components/AuthProvider';
const Header = ({ onMenuToggle, title = "Dashboard" }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuToggle}
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        
<div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="Settings" className="w-5 h-5" />
          </Button>
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

const UserProfile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium text-sm">
          {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.firstName} {user.lastName}
        </span>
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-500" />
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-500">{user.emailAddress}</p>
          </div>
          <button
            onClick={() => {
              logout();
              setShowDropdown(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;