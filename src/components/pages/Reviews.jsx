import React, { useState, useEffect } from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import reviewService from '@/services/api/reviewService';
import employeeService from '@/services/api/employeeService';
import { toast } from 'react-toastify';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
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
      const [reviewsData, employeesData] = await Promise.all([
        reviewService.getAll(),
        employeeService.getAll()
      ]);
      setReviews(reviewsData);
      setEmployees(employeesData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeById = (employeeId) => {
    return employees.find(emp => emp.Id === parseInt(employeeId));
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-600 mt-1">Track and manage employee performance evaluations.</p>
        </div>
        <Button onClick={() => toast.info('Create review functionality coming soon!')}>
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Create Review
        </Button>
      </div>

      {reviews.length === 0 ? (
        <Empty 
          icon="Star"
          title="No reviews found"
          description="Get started by creating your first performance review."
          actionLabel="Create Review"
          onAction={() => toast.info('Create review functionality coming soon!')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map(review => {
            const employee = getEmployeeById(review.employeeId);
            const reviewer = getEmployeeById(review.reviewerId);
            
            if (!employee) return null;
            
            return (
              <Card key={review.Id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={employee.photoUrl}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(review.status)}>
                    {review.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Review Period</span>
                    <span className="text-sm font-medium text-gray-900">{review.period}</span>
                  </div>
                  
                  {reviewer && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Reviewer</span>
                      <span className="text-sm font-medium text-gray-900">
                        {reviewer.firstName} {reviewer.lastName}
                      </span>
                    </div>
                  )}

                  {review.ratings && review.ratings.overall && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall Rating</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <ApperIcon
                              key={star}
                              name="Star"
                              className={`w-4 h-4 ${
                                star <= Math.round(review.ratings.overall)
                                  ? 'text-warning fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold gradient-text">
                          {review.ratings.overall.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {review.comments && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Comments</h4>
                    <p className="text-sm text-gray-700 line-clamp-3">{review.comments}</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Download" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;