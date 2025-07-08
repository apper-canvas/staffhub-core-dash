import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  filterCriteria, 
  sortConfig, 
  onFilter, 
  onSort, 
  onClear,
  departments = [],
  roles = [],
  statuses = [],
  className = "" 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (field, value) => {
    onFilter({
      ...filterCriteria,
      [field]: value
    });
  };

  const hasActiveFilters = filterCriteria.keywords || filterCriteria.department || 
                          filterCriteria.role || filterCriteria.status;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <ApperIcon 
            name="Search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <input
            type="text"
            value={filterCriteria.keywords}
            onChange={(e) => handleFilterChange('keywords', e.target.value)}
            placeholder="Search employees by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
          />
        </div>
        
        <Button
          variant={showFilters ? 'primary' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
          className="whitespace-nowrap"
        >
          <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-1.5 py-0.5 rounded-full">
              {[filterCriteria.department, filterCriteria.role, filterCriteria.status]
                .filter(Boolean).length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={filterCriteria.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={filterCriteria.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filterCriteria.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {hasActiveFilters ? 'Active filters applied' : 'No filters applied'}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                disabled={!hasActiveFilters}
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <ApperIcon name="ChevronUp" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;