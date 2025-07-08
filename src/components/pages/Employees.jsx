import React from 'react';
import EmployeeList from '@/components/organisms/EmployeeList';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const Employees = () => {
  const handleAddEmployee = () => {
    toast.info('Add employee functionality coming soon!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage your team members and their information.</p>
        </div>
        <Button onClick={handleAddEmployee}>
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Add Employee
        </Button>
      </div>

      <EmployeeList />
    </div>
  );
};

export default Employees;