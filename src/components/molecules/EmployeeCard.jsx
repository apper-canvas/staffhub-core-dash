import React from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={employee.photoUrl}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
            employee.status === 'active' ? 'bg-success' : 'bg-error'
          }`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-gray-600 truncate">{employee.role}</p>
          <p className="text-sm text-gray-500 truncate">{employee.email}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Badge variant={getStatusVariant(employee.status)}>
            {employee.status}
          </Badge>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onView && onView(employee)}
            >
              <ApperIcon name="Eye" className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit && onEdit(employee)}
            >
              <ApperIcon name="Edit" className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete && onDelete(employee)}
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;