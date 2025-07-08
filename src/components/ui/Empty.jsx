import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Users", 
  title = "No data found", 
  description = "Get started by adding your first item.", 
  actionLabel = "Add Item",
  onAction 
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6">
            <ApperIcon name={icon} className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          {onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Empty;