import departmentsData from '@/services/mockData/departments.json';

class DepartmentService {
  constructor() {
    this.departments = [...departmentsData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.departments]);
      }, 250);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const department = this.departments.find(dept => dept.Id === parseInt(id));
        if (department) {
          resolve({ ...department });
        } else {
          reject(new Error('Department not found'));
        }
      }, 200);
    });
  }

  async create(department) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDepartment = {
          ...department,
          Id: Math.max(...this.departments.map(dept => dept.Id)) + 1,
          employeeCount: 0
        };
        this.departments.push(newDepartment);
        resolve({ ...newDepartment });
      }, 300);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.departments.findIndex(dept => dept.Id === parseInt(id));
        if (index !== -1) {
          this.departments[index] = { ...this.departments[index], ...updates };
          resolve({ ...this.departments[index] });
        } else {
          reject(new Error('Department not found'));
        }
      }, 250);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.departments.findIndex(dept => dept.Id === parseInt(id));
        if (index !== -1) {
          const deletedDepartment = this.departments.splice(index, 1)[0];
          resolve({ ...deletedDepartment });
        } else {
          reject(new Error('Department not found'));
        }
      }, 200);
    });
  }
}

export default new DepartmentService();