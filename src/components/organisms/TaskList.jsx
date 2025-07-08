import React, { useState, useEffect } from 'react';
import TaskCard from '@/components/molecules/TaskCard';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import taskService from '@/services/api/taskService';
import employeeService from '@/services/api/employeeService';
import { toast } from 'react-toastify';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [tasksData, employeesData] = await Promise.all([
        taskService.getAll(),
        employeeService.getAll()
      ]);
      setTasks(tasksData);
      setEmployees(employeesData);
      setFilteredTasks(tasksData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    applyFilters(searchQuery, status);
  };

  const applyFilters = (query, status) => {
    let filtered = [...tasks];

    if (query.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(task => task.status === status);
    }

    setFilteredTasks(filtered);
  };

const handleUpdateStatus = async (task, newStatus) => {
    try {
      await taskService.update(task.Id, { status: newStatus });
      setTasks(prev => prev.map(t => 
        t.Id === task.Id ? { ...t, status: newStatus } : t
      ));
      setFilteredTasks(prev => prev.map(t => 
        t.Id === task.Id ? { ...t, status: newStatus } : t
      ));
      toast.success('Task status updated successfully');
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async (task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await taskService.delete(task.Id);
        setTasks(prev => prev.filter(t => t.Id !== task.Id));
        setFilteredTasks(prev => prev.filter(t => t.Id !== task.Id));
        toast.success('Task deleted successfully');
      } catch (err) {
        toast.error('Failed to delete task');
      }
    }
  };

const getEmployeeById = (employeeId) => {
    return employees.find(emp => emp.Id === parseInt(employeeId));
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar 
          placeholder="Search tasks..." 
          onSearch={handleSearch}
          className="flex-1 max-w-md"
        />
        <div className="flex items-center space-x-2">
          <Button
            variant={statusFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('all')}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'pending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === 'in-progress' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <Empty 
          icon="CheckSquare"
          title="No tasks found"
          description={searchQuery || statusFilter !== 'all' ? "No tasks match your search criteria." : "Get started by creating your first task."}
          actionLabel="Add Task"
          onAction={() => toast.info('Add task functionality coming soon!')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.Id}
              task={task}
employee={getEmployeeById(task.assignee_id)}
              onEdit={() => toast.info('Edit task functionality coming soon!')}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;