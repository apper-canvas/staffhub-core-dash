import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Departments from "@/components/pages/Departments";

const SearchBar = ({ 
  filterCriteria = {}, 
  sortConfig = {}, 
  onFilter = () => {}, 
  onSort = () => {}, 
  onClear = () => {},
  departments = [],
  roles = [],
  statuses = [],
  className = "" 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Ensure filterCriteria has all required properties with defaults
  const safeFilterCriteria = {
    keywords: '',
    department: '',
    role: '',
    status: '',
    startDate: '',
    endDate: '',
    ...filterCriteria
  }

  const handleFilterChange = (field, value) => {
    if (typeof onFilter === 'function') {
      onFilter({
        ...safeFilterCriteria,
        [field]: value
      })
    }
  }

  const hasActiveFilters = Object.values(safeFilterCriteria).some(value => 
    value !== '' && value !== null && value !== undefined
  )

  return (
    <div className={`bg-white rounded-lg border p-4 mb-6 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by name, email, or employee ID..."
            value={safeFilterCriteria.keywords || ''}
            onChange={(e) => handleFilterChange('keywords', e.target.value)}
            className="w-full"
            icon={<ApperIcon name="Search" size={20} />}
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={safeFilterCriteria.department || ''}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Departments</option>
            {departments?.map(dept => (
              <option key={dept?.id || Math.random()} value={dept?.id || ''}>{dept?.name || 'Unknown'}</option>
            ))}
          </select>

          <select
            value={safeFilterCriteria.role || ''}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Roles</option>
            {roles?.map(role => (
              <option key={role || Math.random()} value={role || ''}>{role || 'Unknown'}</option>
            ))}
          </select>

          <select
            value={safeFilterCriteria.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Statuses</option>
            {statuses?.map(status => (
              <option key={status || Math.random()} value={status || ''}>{status || 'Unknown'}</option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1"
          >
            <ApperIcon name="Filter" size={16} />
            Advanced
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="flex items-center gap-1 text-gray-500"
            >
              <ApperIcon name="X" size={16} />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={safeFilterCriteria.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={safeFilterCriteria.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortConfig?.field || ''}
            onChange={(e) => onSort && onSort(e.target.value)}
            className="px-3 py-1 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Default</option>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="role">Role</option>
            <option value="status">Status</option>
            <option value="startDate">Start Date</option>
          </select>
          
          {sortConfig?.field && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSort && onSort(sortConfig.field)}
              className="flex items-center gap-1"
            >
              <ApperIcon 
                name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
              />
              {sortConfig.direction === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar;