class EmployeeService {
  constructor() {
    this.apperClient = null;
    this.initClient();
  }

  initClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "role" } },
          { field: { Name: "start_date" } },
          { field: { Name: "status" } },
          { field: { Name: "photo_url" } },
          { field: { Name: "custom_fields" } },
          { field: { Name: "department_id" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('employee', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "role" } },
          { field: { Name: "start_date" } },
          { field: { Name: "status" } },
          { field: { Name: "photo_url" } },
          { field: { Name: "custom_fields" } },
          { field: { Name: "department_id" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('employee', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching employee with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(employee) {
    try {
      const params = {
        records: [{
          Name: employee.Name || `${employee.first_name} ${employee.last_name}`,
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          phone: employee.phone,
          role: employee.role,
          start_date: employee.start_date,
          status: employee.status,
          photo_url: employee.photo_url,
          custom_fields: employee.custom_fields,
          department_id: parseInt(employee.department_id)
        }]
      };
      
      const response = await this.apperClient.createRecord('employee', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} employees:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async update(id, updates) {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      // Only include updateable fields
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.first_name !== undefined) updateData.first_name = updates.first_name;
      if (updates.last_name !== undefined) updateData.last_name = updates.last_name;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.phone !== undefined) updateData.phone = updates.phone;
      if (updates.role !== undefined) updateData.role = updates.role;
      if (updates.start_date !== undefined) updateData.start_date = updates.start_date;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.photo_url !== undefined) updateData.photo_url = updates.photo_url;
      if (updates.custom_fields !== undefined) updateData.custom_fields = updates.custom_fields;
      if (updates.department_id !== undefined) updateData.department_id = parseInt(updates.department_id);
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord('employee', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} employees:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord('employee', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} employees:${JSON.stringify(failedDeletions)}`);
        }
        
        return failedDeletions.length === 0;
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  async search(query) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "role" } },
          { field: { Name: "status" } },
          { field: { Name: "department_id" } }
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [{
            operator: "OR",
            conditions: [
              {
                fieldName: "first_name",
                operator: "Contains",
                values: [query],
                include: true
              },
              {
                fieldName: "last_name", 
                operator: "Contains",
                values: [query],
                include: true
              },
              {
                fieldName: "email",
                operator: "Contains", 
                values: [query],
                include: true
              },
              {
                fieldName: "role",
                operator: "Contains",
                values: [query],
                include: true
              }
            ]
          }]
        }]
      };
      
      const response = await this.apperClient.fetchRecords('employee', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async filterAndSort(employees, filterCriteria, sortConfig) {
    // For simplicity, we'll implement client-side filtering and sorting
    // In a production app, this would be done server-side with proper ApperClient queries
    try {
      let filtered = [...employees];

      if (filterCriteria && filterCriteria.keywords) {
        const keywords = filterCriteria.keywords.toLowerCase();
        filtered = filtered.filter(emp => 
          (emp.first_name && emp.first_name.toLowerCase().includes(keywords)) ||
          (emp.last_name && emp.last_name.toLowerCase().includes(keywords)) ||
          (emp.email && emp.email.toLowerCase().includes(keywords)) ||
          (emp.role && emp.role.toLowerCase().includes(keywords))
        );
      }

      if (filterCriteria && filterCriteria.department) {
        filtered = filtered.filter(emp => emp.department_id === filterCriteria.department);
      }

      if (filterCriteria && filterCriteria.role) {
        filtered = filtered.filter(emp => emp.role === filterCriteria.role);
      }

      if (filterCriteria && filterCriteria.status) {
        filtered = filtered.filter(emp => emp.status === filterCriteria.status);
      }

      if (sortConfig && sortConfig.field) {
        filtered.sort((a, b) => {
          let aValue = a[sortConfig.field];
          let bValue = b[sortConfig.field];

          if (sortConfig.field === 'firstName') {
            aValue = `${a.first_name || ''} ${a.last_name || ''}`;
            bValue = `${b.first_name || ''} ${b.last_name || ''}`;
          }

          if (sortConfig.field === 'startDate') {
            aValue = new Date(a.start_date);
            bValue = new Date(b.start_date);
          }

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }

          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }

      return filtered;
    } catch (error) {
      console.error('Failed to filter and sort employees:', error);
      return employees;
    }
  }

  async getByDepartment(departmentId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "role" } },
          { field: { Name: "status" } },
          { field: { Name: "photo_url" } },
          { field: { Name: "department_id" } }
        ],
        where: [{
          FieldName: "department_id",
          Operator: "EqualTo",
          Values: [parseInt(departmentId)]
        }]
      };
      
      const response = await this.apperClient.fetchRecords('employee', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching employees by department:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  // Custom field methods remain client-side for now
  async addCustomField(employeeId, fieldDefinition) {
    const employee = await this.getById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    let customFields = [];
    try {
      customFields = employee.custom_fields ? JSON.parse(employee.custom_fields) : [];
    } catch (e) {
      customFields = [];
    }

    if (customFields.some(field => field.name === fieldDefinition.name)) {
      throw new Error('Field name already exists');
    }

    const newField = {
      ...fieldDefinition,
      id: Date.now().toString(),
      value: fieldDefinition.type === 'boolean' ? false : 
             fieldDefinition.type === 'multiselect' ? [] : ''
    };

    customFields.push(newField);
    
    return await this.update(employeeId, { custom_fields: JSON.stringify(customFields) });
  }

  async updateCustomField(employeeId, fieldId, updates) {
    const employee = await this.getById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    let customFields = [];
    try {
      customFields = employee.custom_fields ? JSON.parse(employee.custom_fields) : [];
    } catch (e) {
      throw new Error('No custom fields found');
    }

    const fieldIndex = customFields.findIndex(field => field.id === fieldId);
    if (fieldIndex === -1) {
      throw new Error('Custom field not found');
    }

    if (updates.name && updates.name !== customFields[fieldIndex].name) {
      if (customFields.some(field => field.name === updates.name && field.id !== fieldId)) {
        throw new Error('Field name already exists');
      }
    }

    customFields[fieldIndex] = { ...customFields[fieldIndex], ...updates };
    
    return await this.update(employeeId, { custom_fields: JSON.stringify(customFields) });
  }

  async removeCustomField(employeeId, fieldId) {
    const employee = await this.getById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    let customFields = [];
    try {
      customFields = employee.custom_fields ? JSON.parse(employee.custom_fields) : [];
    } catch (e) {
      throw new Error('No custom fields found');
    }

    const fieldIndex = customFields.findIndex(field => field.id === fieldId);
    if (fieldIndex === -1) {
      throw new Error('Custom field not found');
    }

    customFields.splice(fieldIndex, 1);
    
    return await this.update(employeeId, { custom_fields: JSON.stringify(customFields) });
  }

  async updateFieldValue(employeeId, fieldId, value) {
    const employee = await this.getById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    let customFields = [];
    try {
      customFields = employee.custom_fields ? JSON.parse(employee.custom_fields) : [];
    } catch (e) {
      throw new Error('No custom fields found');
    }

    const fieldIndex = customFields.findIndex(field => field.id === fieldId);
    if (fieldIndex === -1) {
      throw new Error('Custom field not found');
    }

    customFields[fieldIndex].value = value;
    
    return await this.update(employeeId, { custom_fields: JSON.stringify(customFields) });
  }

  async getEmployeeWithFields(employeeId) {
    return await this.getById(employeeId);
  }
}

const employeeService = new EmployeeService();
export default employeeService;