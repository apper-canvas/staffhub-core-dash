class ReviewService {
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
          { field: { Name: "employee_id" } },
          { field: { Name: "reviewer_id" } },
          { field: { Name: "period" } },
          { field: { Name: "ratings" } },
          { field: { Name: "comments" } },
          { field: { Name: "status" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('review', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching reviews:", error?.response?.data?.message);
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
          { field: { Name: "employee_id" } },
          { field: { Name: "reviewer_id" } },
          { field: { Name: "period" } },
          { field: { Name: "ratings" } },
          { field: { Name: "comments" } },
          { field: { Name: "status" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('review', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching review with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(review) {
    try {
      const params = {
        records: [{
          Name: review.Name || `Review for ${review.employee_id}`,
          employee_id: review.employee_id ? parseInt(review.employee_id) : null,
          reviewer_id: review.reviewer_id ? parseInt(review.reviewer_id) : null,
          period: review.period,
          ratings: review.ratings,
          comments: review.comments,
          status: review.status || 'pending'
        }]
      };
      
      const response = await this.apperClient.createRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} reviews:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating review:", error?.response?.data?.message);
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
      
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.employee_id !== undefined) updateData.employee_id = updates.employee_id ? parseInt(updates.employee_id) : null;
      if (updates.reviewer_id !== undefined) updateData.reviewer_id = updates.reviewer_id ? parseInt(updates.reviewer_id) : null;
      if (updates.period !== undefined) updateData.period = updates.period;
      if (updates.ratings !== undefined) updateData.ratings = updates.ratings;
      if (updates.comments !== undefined) updateData.comments = updates.comments;
      if (updates.status !== undefined) updateData.status = updates.status;
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} reviews:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating review:", error?.response?.data?.message);
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
      
      const response = await this.apperClient.deleteRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} reviews:${JSON.stringify(failedDeletions)}`);
        }
        
        return failedDeletions.length === 0;
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting review:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  async getByEmployee(employeeId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "employee_id" } },
          { field: { Name: "reviewer_id" } },
          { field: { Name: "period" } },
          { field: { Name: "ratings" } },
          { field: { Name: "comments" } },
          { field: { Name: "status" } }
        ],
        where: [{
          FieldName: "employee_id",
          Operator: "EqualTo",
          Values: [parseInt(employeeId)]
        }]
      };
      
      const response = await this.apperClient.fetchRecords('review', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching reviews by employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getByStatus(status) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "employee_id" } },
          { field: { Name: "reviewer_id" } },
          { field: { Name: "period" } },
          { field: { Name: "ratings" } },
          { field: { Name: "comments" } },
          { field: { Name: "status" } }
        ],
        where: [{
          FieldName: "status",
          Operator: "EqualTo",
          Values: [status]
        }]
      };
      
      const response = await this.apperClient.fetchRecords('review', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching reviews by status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
}

export default new ReviewService();