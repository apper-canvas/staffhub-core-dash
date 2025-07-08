import React from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ title, value, icon, trend, trendDirection, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary to-secondary',
    success: 'from-success to-green-600',
    warning: 'from-warning to-yellow-600',
    error: 'from-error to-red-600',
    info: 'from-info to-blue-600'
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold gradient-text">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1">
              <ApperIcon 
                name={trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                className={`w-4 h-4 ${trendDirection === 'up' ? 'text-success' : 'text-error'}`} 
              />
              <span className={`text-sm font-medium ${trendDirection === 'up' ? 'text-success' : 'text-error'}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;