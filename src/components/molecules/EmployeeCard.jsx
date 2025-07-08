import React, { useState } from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import CustomFieldBuilder from '@/components/organisms/CustomFieldBuilder';

const EmployeeCard = ({ employee, onView, onChart, onEdit, onDelete, onEmployeeUpdate }) => {
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [showFieldBuilder, setShowFieldBuilder] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(employee);

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

  const handleEmployeeUpdate = (updatedEmployee) => {
    setCurrentEmployee(updatedEmployee);
    onEmployeeUpdate?.(updatedEmployee);
  };

  const renderCustomFieldValue = (field) => {
    if (!field.value && field.value !== false) return null;

    switch (field.type) {
      case 'boolean':
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            field.value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <ApperIcon name={field.value ? 'Check' : 'X'} className="w-3 h-3 mr-1" />
            {field.value ? 'Yes' : 'No'}
          </span>
        );
      
      case 'multiselect':
        return (
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(field.value) ? field.value : []).map(value => (
              <span key={value} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {value}
              </span>
            ))}
          </div>
        );
      
      case 'date':
        return (
          <span className="text-sm text-gray-700">
            {new Date(field.value).toLocaleDateString()}
          </span>
        );
      
      default:
        return (
          <span className="text-sm text-gray-700">
            {field.value}
          </span>
        );
    }
  };

const customFields = currentEmployee?.custom_fields ? 
    (typeof currentEmployee.custom_fields === 'string' ? 
      JSON.parse(currentEmployee.custom_fields) : 
      currentEmployee.custom_fields) : [];
  const fieldsWithValues = customFields.filter(field => 
    field.value !== null && field.value !== undefined && field.value !== ''
  );

  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-4">
          <div className="relative">
<img
              src={currentEmployee.photo_url}
              alt={`${currentEmployee.first_name} ${currentEmployee.last_name}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              currentEmployee.status === 'active' ? 'bg-success' : 'bg-error'
            }`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {currentEmployee.first_name} {currentEmployee.last_name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{currentEmployee.role}</p>
            <p className="text-sm text-gray-500 truncate">{currentEmployee.email}</p>
          </div>
        </div>
        
        {/* Custom Fields Display */}
        {fieldsWithValues.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Custom Attributes</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomFields(!showCustomFields)}
                className="text-xs"
              >
                <ApperIcon 
                  name={showCustomFields ? 'ChevronUp' : 'ChevronDown'} 
                  className="w-3 h-3 mr-1" 
                />
                {showCustomFields ? 'Hide' : 'Show'} ({fieldsWithValues.length})
              </Button>
            </div>
            
            {showCustomFields && (
              <div className="space-y-2">
                {fieldsWithValues.slice(0, 4).map(field => (
                  <div key={field.id} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600 truncate flex-1 mr-2">
                      {field.label}:
                    </span>
                    <div className="flex-shrink-0">
                      {renderCustomFieldValue(field)}
                    </div>
                  </div>
                ))}
                {fieldsWithValues.length > 4 && (
                  <div className="text-xs text-gray-500 text-center pt-2">
                    +{fieldsWithValues.length - 4} more fields
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Badge variant={getStatusVariant(currentEmployee.status)}>
              {currentEmployee.status}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onView && onView(currentEmployee)}
                title="View Details"
              >
                <ApperIcon name="Eye" className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onChart && onChart(currentEmployee)}
                title="View Performance"
              >
                <ApperIcon name="TrendingUp" className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowFieldBuilder(true)}
                title="Manage Custom Fields"
              >
                <ApperIcon name="Settings" className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit && onEdit(currentEmployee)}
                title="Edit Employee"
              >
                <ApperIcon name="Edit" className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete && onDelete(currentEmployee)}
                title="Delete Employee"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <CustomFieldBuilder
        employee={currentEmployee}
        isOpen={showFieldBuilder}
        onClose={() => setShowFieldBuilder(false)}
        onUpdate={handleEmployeeUpdate}
      />
    </>
  );
};

export default EmployeeCard;