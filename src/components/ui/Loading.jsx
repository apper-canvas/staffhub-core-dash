import React from 'react';

const Loading = ({ type = 'cards' }) => {
  if (type === 'table') {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="skeleton h-6 w-32 rounded"></div>
              <div className="skeleton h-8 w-24 rounded"></div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4 rounded"></div>
                    <div className="skeleton h-3 w-1/2 rounded"></div>
                  </div>
                  <div className="skeleton h-6 w-20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className="animate-pulse space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

        {/* Chart and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="skeleton h-6 w-32 rounded mb-4"></div>
            <div className="skeleton h-64 w-full rounded"></div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="skeleton h-6 w-32 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="skeleton h-8 w-8 rounded-full"></div>
                  <div className="flex-1">
                    <div className="skeleton h-4 w-3/4 rounded mb-1"></div>
                    <div className="skeleton h-3 w-1/2 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="skeleton h-16 w-16 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-3/4 rounded"></div>
                <div className="skeleton h-4 w-1/2 rounded"></div>
                <div className="skeleton h-3 w-2/3 rounded"></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="skeleton h-6 w-20 rounded-full"></div>
                <div className="skeleton h-8 w-24 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;