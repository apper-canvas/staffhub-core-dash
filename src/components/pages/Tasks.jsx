import React from 'react';
import TaskList from '@/components/organisms/TaskList';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const Tasks = () => {
  const handleAddTask = () => {
    toast.info('Add task functionality coming soon!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage assignments and track progress across your team.</p>
        </div>
        <Button onClick={handleAddTask}>
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Create Task
        </Button>
      </div>

      <TaskList />
    </div>
  );
};

export default Tasks;