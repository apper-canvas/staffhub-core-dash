import React from "react";
import Error from "@/components/ui/Error";
import employeesData from "@/services/mockData/employees.json";

class EmployeeService {
  constructor() {
    this.employees = [...employeesData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.employees]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employee = this.employees.find(emp => emp.Id === parseInt(id));
        if (employee) {
          resolve({ ...employee });
        } else {
          reject(new Error('Employee not found'));
        }
      }, 200);
    });
  }

async create(employee) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!employee || typeof employee !== 'object') {
          reject(new Error('Invalid employee data'));
          return;
        }
        
        try {
          const employeeIds = this.employees.map(emp => emp.Id).filter(id => !isNaN(id));
          const maxId = employeeIds.length > 0 ? Math.max(...employeeIds) : 0;
          
          const newEmployee = {
            ...employee,
            Id: maxId + 1,
            startDate: new Date().toISOString().split('T')[0]
          };
          this.employees.push(newEmployee);
          resolve({ ...newEmployee });
        } catch (error) {
          reject(new Error('Failed to create employee'));
        }
      }, 400);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.employees.findIndex(emp => emp.Id === parseInt(id));
        if (index !== -1) {
          this.employees[index] = { ...this.employees[index], ...updates };
          resolve({ ...this.employees[index] });
        } else {
          reject(new Error('Employee not found'));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.employees.findIndex(emp => emp.Id === parseInt(id));
        if (index !== -1) {
          const deletedEmployee = this.employees.splice(index, 1)[0];
          resolve({ ...deletedEmployee });
        } else {
          reject(new Error('Employee not found'));
        }
      }, 250);
    });
  }

async search(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query || typeof query !== 'string') {
          resolve([...this.employees]);
          return;
        }
        
        const filteredEmployees = this.employees.filter(emp => 
          (emp.firstName && emp.firstName.toLowerCase().includes(query.toLowerCase())) ||
          (emp.lastName && emp.lastName.toLowerCase().includes(query.toLowerCase())) ||
          (emp.email && emp.email.toLowerCase().includes(query.toLowerCase())) ||
          (emp.role && emp.role.toLowerCase().includes(query.toLowerCase()))
        );
        resolve([...filteredEmployees]);
      }, 200);
    });
  }

  async filterAndSort(employees, filterCriteria, sortConfig) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!Array.isArray(employees)) {
            reject(new Error('Invalid employees data'));
            return;
          }
          
          let filtered = [...employees];

          // Apply filters
          if (filterCriteria && filterCriteria.keywords) {
            const keywords = filterCriteria.keywords.toLowerCase();
            filtered = filtered.filter(emp => 
              (emp.firstName && emp.firstName.toLowerCase().includes(keywords)) ||
              (emp.lastName && emp.lastName.toLowerCase().includes(keywords)) ||
              (emp.email && emp.email.toLowerCase().includes(keywords)) ||
              (emp.role && emp.role.toLowerCase().includes(keywords))
            );
          }

          if (filterCriteria && filterCriteria.department) {
            filtered = filtered.filter(emp => emp.department === filterCriteria.department);
          }

          if (filterCriteria && filterCriteria.role) {
            filtered = filtered.filter(emp => emp.role === filterCriteria.role);
          }

          if (filterCriteria && filterCriteria.status) {
            filtered = filtered.filter(emp => emp.status === filterCriteria.status);
          }

          // Apply sorting
          if (sortConfig && sortConfig.field) {
            filtered.sort((a, b) => {
              let aValue = a[sortConfig.field];
              let bValue = b[sortConfig.field];

              // Handle name sorting (combine first and last name)
              if (sortConfig.field === 'firstName') {
                aValue = `${a.firstName || ''} ${a.lastName || ''}`;
                bValue = `${b.firstName || ''} ${b.lastName || ''}`;
              }

              // Handle date sorting
              if (sortConfig.field === 'startDate') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
              }

              // String comparison
              if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
              }

              if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
              if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
              return 0;
            });
          }

          resolve(filtered);
        } catch (error) {
          reject(new Error('Failed to filter and sort employees'));
        }
      }, 200);
    });
  }

  async getByDepartment(departmentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!departmentId) {
          resolve([]);
          return;
        }
        
const employees = this.employees.filter(emp => emp.departmentId === departmentId.toString());
        resolve([...employees]);
      }, 250);
    });
  }

  async addCustomField(employeeId, fieldDefinition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.employees.findIndex(emp => emp.Id === parseInt(employeeId));
        if (index === -1) {
          reject(new Error('Employee not found'));
          return;
        }

        const employee = this.employees[index];
        if (!employee.customFields) {
          employee.customFields = [];
        }

        // Check if field name already exists
        if (employee.customFields.some(field => field.name === fieldDefinition.name)) {
          reject(new Error('Field name already exists'));
          return;
        }

        const newField = {
          ...fieldDefinition,
          id: Date.now().toString(),
          value: fieldDefinition.type === 'boolean' ? false : 
                 fieldDefinition.type === 'multiselect' ? [] : ''
        };

        employee.customFields.push(newField);
        resolve({ ...employee });
      }, 300);
    });
  }

  async updateCustomField(employeeId, fieldId, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employeeIndex = this.employees.findIndex(emp => emp.Id === parseInt(employeeId));
        if (employeeIndex === -1) {
          reject(new Error('Employee not found'));
          return;
        }

        const employee = this.employees[employeeIndex];
        if (!employee.customFields) {
          reject(new Error('No custom fields found'));
          return;
        }

        const fieldIndex = employee.customFields.findIndex(field => field.id === fieldId);
        if (fieldIndex === -1) {
          reject(new Error('Custom field not found'));
          return;
        }

        // Check if updating name and it conflicts with existing
        if (updates.name && updates.name !== employee.customFields[fieldIndex].name) {
          if (employee.customFields.some(field => field.name === updates.name && field.id !== fieldId)) {
            reject(new Error('Field name already exists'));
            return;
          }
        }

        employee.customFields[fieldIndex] = { ...employee.customFields[fieldIndex], ...updates };
        resolve({ ...employee });
      }, 300);
    });
  }

  async removeCustomField(employeeId, fieldId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employeeIndex = this.employees.findIndex(emp => emp.Id === parseInt(employeeId));
        if (employeeIndex === -1) {
          reject(new Error('Employee not found'));
          return;
        }

        const employee = this.employees[employeeIndex];
        if (!employee.customFields) {
          reject(new Error('No custom fields found'));
          return;
        }

        const fieldIndex = employee.customFields.findIndex(field => field.id === fieldId);
        if (fieldIndex === -1) {
          reject(new Error('Custom field not found'));
          return;
        }

        employee.customFields.splice(fieldIndex, 1);
        resolve({ ...employee });
      }, 250);
    });
  }

  async updateFieldValue(employeeId, fieldId, value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employeeIndex = this.employees.findIndex(emp => emp.Id === parseInt(employeeId));
        if (employeeIndex === -1) {
          reject(new Error('Employee not found'));
          return;
        }

        const employee = this.employees[employeeIndex];
        if (!employee.customFields) {
          reject(new Error('No custom fields found'));
          return;
        }

        const fieldIndex = employee.customFields.findIndex(field => field.id === fieldId);
        if (fieldIndex === -1) {
          reject(new Error('Custom field not found'));
          return;
        }

        employee.customFields[fieldIndex].value = value;
        resolve({ ...employee });
      }, 200);
    });
  }

  async getEmployeeWithFields(employeeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employee = this.employees.find(emp => emp.Id === parseInt(employeeId));
        if (employee) {
          resolve({ ...employee });
        } else {
          reject(new Error('Employee not found'));
        }
      }, 200);
    });
  }
}