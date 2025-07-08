import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import reviewService from '@/services/api/reviewService';
import { toast } from 'react-toastify';

const PerformanceChart = ({ employee, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);
        const employeeReviews = await reviewService.getByEmployee(employee.Id);
        
        // Sort reviews by period for proper timeline
        const sortedReviews = employeeReviews.sort((a, b) => a.period.localeCompare(b.period));
        setReviews(sortedReviews);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load performance data');
      } finally {
        setLoading(false);
      }
    };

    if (employee?.Id) {
      fetchPerformanceData();
    }
  }, [employee]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  // Prepare chart data
  const periods = reviews.map(review => review.period);
  const overallRatings = reviews.map(review => review.ratings.overall);
  
  // Extract all rating categories for multi-line chart
  const ratingCategories = reviews.length > 0 ? Object.keys(reviews[0].ratings).filter(key => key !== 'overall') : [];
  const series = [
    {
      name: 'Overall Rating',
      data: overallRatings,
      color: '#2563EB'
    },
    ...ratingCategories.map((category, index) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      data: reviews.map(review => review.ratings[category] || 0),
      color: ['#10B981', '#F59E0B', '#EF4444', '#7C3AED', '#06B6D4'][index % 5]
    }))
  ];

  const chartOptions = {
    chart: {
      type: 'line',
      height: 400,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: periods,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 5,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 3
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      fontWeight: 500,
      labels: {
        colors: '#374151'
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px'
      }
    },
    markers: {
      size: 6,
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: {
        sizeOffset: 2
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Performance History
              </h1>
              <p className="text-gray-600 mt-1">
                {employee.firstName} {employee.lastName} - {employee.role}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={employee.photoUrl}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
      </div>

      {reviews.length === 0 ? (
        <Card className="p-8 text-center">
          <ApperIcon name="TrendingUp" className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Performance Data</h3>
          <p className="text-gray-600">
            No reviews available for this employee yet. Performance charts will appear once reviews are completed.
          </p>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Rating Trends Over Time</h2>
            <p className="text-gray-600">
              Track performance across {reviews.length} review periods
            </p>
          </div>
          
          <div className="w-full">
            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height={400}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-1">Latest Overall Rating</h3>
              <p className="text-2xl font-bold text-blue-700">
                {reviews.length > 0 ? reviews[reviews.length - 1].ratings.overall.toFixed(1) : 'N/A'}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-900 mb-1">Average Rating</h3>
              <p className="text-2xl font-bold text-green-700">
                {reviews.length > 0 ? (overallRatings.reduce((a, b) => a + b, 0) / overallRatings.length).toFixed(1) : 'N/A'}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-900 mb-1">Total Reviews</h3>
              <p className="text-2xl font-bold text-purple-700">{reviews.length}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PerformanceChart;