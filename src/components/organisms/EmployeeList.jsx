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
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await employeeService.getAll();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp => 
        emp.firstName.toLowerCase().includes(query.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase()) ||
        emp.role.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar 
          placeholder="Search employees..." 
          onSearch={handleSearch}
          className="flex-1 max-w-md"
        />
        <div className="flex items-center space-x-2">
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
          description={searchQuery ? "No employees match your search criteria." : "Get started by adding your first employee."}
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;