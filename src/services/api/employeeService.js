import employeesData from '@/services/mockData/employees.json';

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
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEmployee = {
          ...employee,
          Id: Math.max(...this.employees.map(emp => emp.Id)) + 1,
          startDate: new Date().toISOString().split('T')[0]
        };
        this.employees.push(newEmployee);
        resolve({ ...newEmployee });
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
        const filteredEmployees = this.employees.filter(emp => 
          emp.firstName.toLowerCase().includes(query.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(query.toLowerCase()) ||
          emp.email.toLowerCase().includes(query.toLowerCase()) ||
          emp.role.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...filteredEmployees]);
      }, 200);
    });
  }

  async getByDepartment(departmentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const employees = this.employees.filter(emp => emp.departmentId === departmentId.toString());
        resolve([...employees]);
      }, 250);
    });
  }
}

export default new EmployeeService();