import React, { useState, useEffect } from 'react';
import StatCard from '@/components/molecules/StatCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import employeeService from '@/services/api/employeeService';
import departmentService from '@/services/api/departmentService';
import taskService from '@/services/api/taskService';
import reviewService from '@/services/api/reviewService';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    activeTasks: 0,
    pendingReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [employees, departments, tasks, reviews] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll(),
        taskService.getAll(),
        reviewService.getAll()
      ]);

      setStats({
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        activeTasks: tasks.filter(task => task.status !== 'completed').length,
        pendingReviews: reviews.filter(review => review.status === 'pending').length
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="skeleton h-4 w-20 rounded"></div>
                <div className="skeleton h-8 w-16 rounded"></div>
              </div>
              <div className="skeleton h-12 w-12 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadStats} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Employees"
        value={stats.totalEmployees}
        icon="Users"
        color="primary"
      />
      <StatCard
        title="Departments"
        value={stats.totalDepartments}
        icon="Building"
        color="success"
      />
      <StatCard
        title="Active Tasks"
        value={stats.activeTasks}
        icon="CheckSquare"
        color="warning"
      />
      <StatCard
        title="Pending Reviews"
        value={stats.pendingReviews}
        icon="Star"
        color="info"
      />
    </div>
  );
};

export default DashboardStats;