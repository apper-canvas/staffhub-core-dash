import React, { useState, useEffect } from 'react';
import EmployeeCard from '@/components/molecules/EmployeeCard';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import employeeService from '@/services/api/employeeService';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('cards');
  const [filterCriteria, setFilterCriteria] = useState({
    keywords: '',
    department: '',
    role: '',
    status: ''
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'firstName',
    direction: 'asc'
  });

useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [employees, filterCriteria, sortConfig]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = async () => {
    try {
      const filteredAndSorted = await employeeService.filterAndSort(
        employees,
        filterCriteria,
        sortConfig
      );
      setFilteredEmployees(filteredAndSorted);
    } catch (err) {
      setFilteredEmployees(employees);
    }
  };

const handleFilter = (newFilters) => {
    setFilterCriteria(newFilters);
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setFilterCriteria({
      keywords: '',
      department: '',
      role: '',
      status: ''
    });
    setSortConfig({
      field: 'firstName',
      direction: 'asc'
    });
  };

  const getUniqueValues = (field) => {
    return [...new Set(employees.map(emp => emp[field]).filter(Boolean))];
  };

  const handleDelete = async (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      try {
        await employeeService.delete(employee.Id);
        setEmployees(prev => prev.filter(emp => emp.Id !== employee.Id));
        setFilteredEmployees(prev => prev.filter(emp => emp.Id !== employee.Id));
        toast.success('Employee deleted successfully');
      } catch (err) {
        toast.error('Failed to delete employee');
      }
    }
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadEmployees} />;

return (
    <div className="space-y-6">
      <SearchBar 
        filterCriteria={filterCriteria}
        sortConfig={sortConfig}
        onFilter={handleFilter}
        onSort={handleSort}
        onClear={clearFilters}
        departments={getUniqueValues('department')}
        roles={getUniqueValues('role')}
        statuses={getUniqueValues('status')}
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''}
          </span>
          {(filterCriteria.keywords || filterCriteria.department || filterCriteria.role || filterCriteria.status) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <ApperIcon name="X" className="w-3 h-3 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">Sort:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('firstName')}
              className="text-xs"
            >
              Name
              {sortConfig.field === 'firstName' && (
                <ApperIcon 
                  name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                  className="w-3 h-3 ml-1" 
                />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('department')}
              className="text-xs"
            >
              Department
              {sortConfig.field === 'department' && (
                <ApperIcon 
                  name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                  className="w-3 h-3 ml-1" 
                />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('startDate')}
              className="text-xs"
            >
              Hire Date
              {sortConfig.field === 'startDate' && (
                <ApperIcon 
                  name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                  className="w-3 h-3 ml-1" 
                />
              )}
            </Button>
          </div>
          
          <div className="h-4 w-px bg-gray-300"></div>
          
          <Button
            variant={viewMode === 'cards' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            <ApperIcon name="Grid3X3" className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <ApperIcon name="List" className="w-4 h-4" />
          </Button>
        </div>
      </div>

{filteredEmployees.length === 0 ? (
        <Empty 
          icon="Users"
          title="No employees found"
          description={
            (filterCriteria.keywords || filterCriteria.department || filterCriteria.role || filterCriteria.status) 
              ? "No employees match your filter criteria." 
              : "Get started by adding your first employee."
          }
          actionLabel="Add Employee"
          onAction={() => toast.info('Add employee functionality coming soon!')}
        />
      ) : (
        <div className={viewMode === 'cards' ? 
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : 
          "space-y-4"
}>
          {filteredEmployees.map(employee => (
            <EmployeeCard 
              key={employee.Id}
              employee={employee}
              onView={() => toast.info('View employee details coming soon!')}
              onEdit={() => toast.info('Edit employee functionality coming soon!')}
              onDelete={handleDelete}
              onEmployeeUpdate={(updatedEmployee) => {
                setEmployees(prev => 
                  prev.map(emp => emp.Id === updatedEmployee.Id ? updatedEmployee : emp)
                );
                setFilteredEmployees(prev => 
                  prev.map(emp => emp.Id === updatedEmployee.Id ? updatedEmployee : emp)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;