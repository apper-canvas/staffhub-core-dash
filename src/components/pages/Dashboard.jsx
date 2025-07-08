import React from 'react';
import DashboardStats from '@/components/organisms/DashboardStats';
import RecentActivity from '@/components/organisms/RecentActivity';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your team overview.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Calendar" className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </Card>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <ApperIcon name="Zap" className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105">
              <ApperIcon name="UserPlus" className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Add Employee</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-success to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
              <ApperIcon name="Plus" className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Create Task</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-warning to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105">
              <ApperIcon name="Star" className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">New Review</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-info to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              <ApperIcon name="Building" className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Add Department</span>
            </button>
          </div>
        </Card>

        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <ApperIcon name="Trophy" className="w-5 h-5 text-warning" />
          </div>
          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', role: 'Senior Engineer', score: 95 },
              { name: 'Michael Chen', role: 'Product Manager', score: 92 },
              { name: 'Emily Rodriguez', role: 'UX Designer', score: 90 }
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{performer.name}</p>
                  <p className="text-sm text-gray-600">{performer.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold gradient-text">{performer.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Task Distribution</h3>
            <ApperIcon name="PieChart" className="w-5 h-5 text-accent" />
          </div>
          <div className="space-y-3">
            {[
              { status: 'Completed', count: 12, color: 'success' },
              { status: 'In Progress', count: 8, color: 'info' },
              { status: 'Pending', count: 5, color: 'warning' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                    item.color === 'success' ? 'from-success to-green-600' :
                    item.color === 'info' ? 'from-info to-blue-600' :
                    'from-warning to-yellow-600'
                  }`}></div>
                  <span className="text-sm text-gray-700">{item.status}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <ApperIcon name="Clock" className="w-5 h-5 text-error" />
          </div>
          <div className="space-y-3">
            {[
              { task: 'Q4 Performance Reviews', days: 2, urgent: true },
              { task: 'Mobile App Wireframes', days: 5, urgent: false },
              { task: 'Marketing Campaign', days: 7, urgent: false }
            ].map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{deadline.task}</p>
                  <p className="text-sm text-gray-600">Due in {deadline.days} days</p>
                </div>
                {deadline.urgent && (
                  <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;