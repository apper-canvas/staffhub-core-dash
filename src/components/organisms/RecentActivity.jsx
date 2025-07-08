import React, { useState, useEffect } from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulate recent activities
    const mockActivities = [
      {
        id: 1,
        type: 'employee_added',
        message: 'Sarah Johnson joined the Engineering team',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        icon: 'UserPlus',
        color: 'success'
      },
      {
        id: 2,
        type: 'task_completed',
        message: 'Client onboarding process completed',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        icon: 'CheckCircle',
        color: 'success'
      },
      {
        id: 3,
        type: 'review_pending',
        message: 'Q4 performance review pending for Lisa Wang',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        icon: 'Star',
        color: 'warning'
      },
      {
        id: 4,
        type: 'task_assigned',
        message: 'New task assigned to Michael Chen',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        icon: 'UserCheck',
        color: 'info'
      },
      {
        id: 5,
        type: 'department_updated',
        message: 'Marketing department structure updated',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        icon: 'Building',
        color: 'primary'
      }
    ];

    setActivities(mockActivities);
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Badge variant="outline">{activities.length} updates</Badge>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${
              activity.color === 'success' ? 'from-success to-green-600' :
              activity.color === 'warning' ? 'from-warning to-yellow-600' :
              activity.color === 'info' ? 'from-info to-blue-600' :
              activity.color === 'primary' ? 'from-primary to-secondary' :
              'from-gray-500 to-gray-600'
            } flex items-center justify-center`}>
              <ApperIcon name={activity.icon} className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {format(activity.timestamp, 'MMM dd, yyyy • h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;