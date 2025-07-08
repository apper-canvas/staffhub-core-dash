import React, { useState, useEffect } from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import employeeService from '@/services/api/employeeService';
import { toast } from 'react-toastify';

const CustomFieldBuilder = ({ employee, isOpen, onClose, onUpdate }) => {
  const [customFields, setCustomFields] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newField, setNewField] = useState({
    name: '',
    type: 'text',
    label: '',
    required: false,
    options: []
  });

  const fieldTypes = [
    { value: 'text', label: 'Text', icon: 'Type' },
    { value: 'number', label: 'Number', icon: 'Hash' },
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'select', label: 'Select', icon: 'List' },
    { value: 'multiselect', label: 'Multi-Select', icon: 'CheckSquare' },
    { value: 'boolean', label: 'Yes/No', icon: 'ToggleLeft' }
  ];

  useEffect(() => {
    if (isOpen && employee) {
      loadCustomFields();
    }
  }, [isOpen, employee]);

  const loadCustomFields = () => {
    setCustomFields(employee?.customFields || []);
  };

  const handleCreateField = async () => {
    if (!newField.name.trim() || !newField.label.trim()) {
      toast.error('Field name and label are required');
      return;
    }

    try {
      setLoading(true);
      const updatedEmployee = await employeeService.addCustomField(employee.Id, {
        ...newField,
        name: newField.name.toLowerCase().replace(/\s+/g, '_'),
        id: Date.now().toString()
      });
      
      setCustomFields(updatedEmployee.customFields);
      setNewField({ name: '', type: 'text', label: '', required: false, options: [] });
      setIsCreating(false);
      onUpdate?.(updatedEmployee);
      toast.success('Custom field created successfully');
    } catch (error) {
      toast.error('Failed to create custom field');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateField = async (fieldId, updates) => {
    try {
      setLoading(true);
      const updatedEmployee = await employeeService.updateCustomField(employee.Id, fieldId, updates);
      setCustomFields(updatedEmployee.customFields);
      setEditingField(null);
      onUpdate?.(updatedEmployee);
      toast.success('Custom field updated successfully');
    } catch (error) {
      toast.error('Failed to update custom field');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteField = async (fieldId) => {
    if (!confirm('Are you sure you want to delete this custom field? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      const updatedEmployee = await employeeService.removeCustomField(employee.Id, fieldId);
      setCustomFields(updatedEmployee.customFields);
      onUpdate?.(updatedEmployee);
      toast.success('Custom field deleted successfully');
    } catch (error) {
      toast.error('Failed to delete custom field');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFieldValue = async (fieldId, value) => {
    try {
      const updatedEmployee = await employeeService.updateFieldValue(employee.Id, fieldId, value);
      setCustomFields(updatedEmployee.customFields);
      onUpdate?.(updatedEmployee);
    } catch (error) {
      toast.error('Failed to update field value');
    }
  };

  const renderFieldForm = (field = newField, isEditing = false) => (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Name
          </label>
          <Input
            value={isEditing ? editingField?.name || '' : field.name}
            onChange={(e) => {
              if (isEditing) {
                setEditingField(prev => ({ ...prev, name: e.target.value }));
              } else {
                setNewField(prev => ({ ...prev, name: e.target.value }));
              }
            }}
            placeholder="e.g., programming_skills"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Label
          </label>
          <Input
            value={isEditing ? editingField?.label || '' : field.label}
            onChange={(e) => {
              if (isEditing) {
                setEditingField(prev => ({ ...prev, label: e.target.value }));
              } else {
                setNewField(prev => ({ ...prev, label: e.target.value }));
              }
            }}
            placeholder="e.g., Programming Skills"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Field Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {fieldTypes.map(type => (
            <button
              key={type.value}
              onClick={() => {
                if (isEditing) {
                  setEditingField(prev => ({ ...prev, type: type.value }));
                } else {
                  setNewField(prev => ({ ...prev, type: type.value }));
                }
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                (isEditing ? editingField?.type : field.type) === type.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <ApperIcon name={type.icon} className="w-4 h-4" />
                <span className="text-xs font-medium">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {((isEditing ? editingField?.type : field.type) === 'select' || 
        (isEditing ? editingField?.type : field.type) === 'multiselect') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Options (comma-separated)
          </label>
          <Input
            value={(isEditing ? editingField?.options : field.options)?.join(', ') || ''}
            onChange={(e) => {
              const options = e.target.value.split(',').map(opt => opt.trim()).filter(Boolean);
              if (isEditing) {
                setEditingField(prev => ({ ...prev, options }));
              } else {
                setNewField(prev => ({ ...prev, options }));
              }
            }}
            placeholder="Option 1, Option 2, Option 3"
            className="w-full"
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`required-${isEditing ? 'edit' : 'new'}`}
          checked={isEditing ? editingField?.required : field.required}
          onChange={(e) => {
            if (isEditing) {
              setEditingField(prev => ({ ...prev, required: e.target.checked }));
            } else {
              setNewField(prev => ({ ...prev, required: e.target.checked }));
            }
          }}
          className="rounded border-gray-300"
        />
        <label htmlFor={`required-${isEditing ? 'edit' : 'new'}`} className="text-sm text-gray-700">
          Required field
        </label>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={() => {
            if (isEditing) {
              handleUpdateField(editingField.id, editingField);
            } else {
              handleCreateField();
            }
          }}
          disabled={loading}
          className="flex-1"
        >
          <ApperIcon name="Save" className="w-4 h-4 mr-2" />
          {isEditing ? 'Update Field' : 'Create Field'}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (isEditing) {
              setEditingField(null);
            } else {
              setIsCreating(false);
              setNewField({ name: '', type: 'text', label: '', required: false, options: [] });
            }
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderFieldValue = (field) => {
    const value = field.value;
    
    switch (field.type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleUpdateFieldValue(field.id, e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">{value ? 'Yes' : 'No'}</span>
          </div>
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleUpdateFieldValue(field.id, newValues);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <Input
            type={field.type}
            value={value || ''}
            onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className="w-full"
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Custom Fields - {employee?.firstName} {employee?.lastName}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage custom attributes and their values
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="space-y-6">
            {/* Add New Field Button */}
            {!isCreating && !editingField && (
              <Button
                onClick={() => setIsCreating(true)}
                className="w-full"
              >
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Add Custom Field
              </Button>
            )}

            {/* Create New Field Form */}
            {isCreating && (
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Field</h3>
                {renderFieldForm()}
              </Card>
            )}

            {/* Existing Fields */}
            {customFields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Existing Fields</h3>
                {customFields.map(field => (
                  <Card key={field.id} className="p-4">
                    {editingField?.id === field.id ? (
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Edit Field</h4>
                        {renderFieldForm(field, true)}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <ApperIcon 
                              name={fieldTypes.find(t => t.value === field.type)?.icon || 'Type'} 
                              className="w-5 h-5 text-gray-500" 
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{field.label}</h4>
                              <p className="text-sm text-gray-500">
                                {fieldTypes.find(t => t.value === field.type)?.label} 
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingField(field)}
                            >
                              <ApperIcon name="Edit" className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteField(field.id)}
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Value:
                          </label>
                          {renderFieldValue(field)}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {customFields.length === 0 && !isCreating && (
              <div className="text-center py-8">
                <ApperIcon name="Settings" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Custom Fields</h3>
                <p className="text-gray-600">
                  Create custom fields to capture additional employee information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFieldBuilder;