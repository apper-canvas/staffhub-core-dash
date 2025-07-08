import React from 'react';
import { cn } from '@/utils/cn';

const Badge = ({ variant = 'default', size = 'sm', className, children, ...props }) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors duration-200";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-secondary text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-yellow-600 text-white",
    error: "bg-gradient-to-r from-error to-red-600 text-white",
    info: "bg-gradient-to-r from-info to-blue-600 text-white",
    outline: "border border-gray-300 text-gray-700 bg-white"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;