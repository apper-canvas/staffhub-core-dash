import React from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const TaskCard = ({ task, employee, onEdit, onDelete, onUpdateStatus }) => {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit && onEdit(task)}
            >
              <ApperIcon name="Edit" className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete && onDelete(task)}
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>
            <Badge variant={getStatusVariant(task.status)}>
              {task.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        </div>

        {employee && (
          <div className="flex items-center space-x-3 pt-3 border-t border-gray-200">
            <img
              src={employee.photoUrl}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-xs text-gray-500">{employee.role}</p>
            </div>
            {onUpdateStatus && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateStatus(task, task.status === 'completed' ? 'pending' : 'completed')}
              >
                {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;