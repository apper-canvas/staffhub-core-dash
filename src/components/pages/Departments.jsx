import React, { useState, useEffect } from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import departmentService from '@/services/api/departmentService';
import employeeService from '@/services/api/employeeService';
import { toast } from 'react-toastify';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [departmentsData, employeesData] = await Promise.all([
        departmentService.getAll(),
        employeeService.getAll()
      ]);
      setDepartments(departmentsData);
      setEmployees(employeesData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentManager = (managerId) => {
    return employees.find(emp => emp.Id === parseInt(managerId));
  };

  const getDepartmentEmployees = (departmentId) => {
    return employees.filter(emp => emp.departmentId === departmentId.toString());
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-1">Organize your team structure and manage departments.</p>
        </div>
        <Button onClick={() => toast.info('Add department functionality coming soon!')}>
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Add Department
        </Button>
      </div>

      {departments.length === 0 ? (
        <Empty 
          icon="Building"
          title="No departments found"
          description="Get started by creating your first department."
          actionLabel="Add Department"
          onAction={() => toast.info('Add department functionality coming soon!')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(department => {
            const manager = getDepartmentManager(department.managerId);
            const departmentEmployees = getDepartmentEmployees(department.Id);
            
            return (
              <Card key={department.Id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                      <ApperIcon name="Building" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                      <p className="text-sm text-gray-600">
                        {departmentEmployees.length} employees
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary">
                    {departmentEmployees.length}
                  </Badge>
                </div>

                {manager && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={manager.photoUrl}
                        alt={`${manager.firstName} ${manager.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {manager.firstName} {manager.lastName}
                        </p>
                        <p className="text-sm text-gray-600">Department Manager</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Team Members</h4>
                  {departmentEmployees.length === 0 ? (
                    <p className="text-sm text-gray-500">No team members assigned</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {departmentEmployees.slice(0, 3).map(employee => (
                        <div key={employee.Id} className="flex items-center space-x-1">
                          <img
                            src={employee.photoUrl}
                            alt={`${employee.firstName} ${employee.lastName}`}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-700">
                            {employee.firstName}
                          </span>
                        </div>
                      ))}
                      {departmentEmployees.length > 3 && (
                        <span className="text-sm text-gray-500">
                          +{departmentEmployees.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Departments;