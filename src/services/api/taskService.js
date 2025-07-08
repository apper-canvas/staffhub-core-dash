import tasksData from "@/services/mockData/tasks.json";
class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.tasks]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.find(task => task.Id === parseInt(id));
        if (task) {
          resolve({ ...task });
        } else {
          reject(new Error('Task not found'));
        }
      }, 200);
    });
  }

  async create(task) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          ...task,
          Id: Math.max(...this.tasks.map(t => t.Id)) + 1,
          status: 'pending'
        };
        this.tasks.push(newTask);
        resolve({ ...newTask });
      }, 400);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.tasks.findIndex(task => task.Id === parseInt(id));
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...updates };
          resolve({ ...this.tasks[index] });
        } else {
          reject(new Error('Task not found'));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.tasks.findIndex(task => task.Id === parseInt(id));
        if (index !== -1) {
          const deletedTask = this.tasks.splice(index, 1)[0];
          resolve({ ...deletedTask });
        } else {
          reject(new Error('Task not found'));
        }
      }, 250);
    });
  }

  async getByAssignee(assigneeId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.tasks.filter(task => task.assigneeId === assigneeId.toString());
        resolve([...tasks]);
      }, 250);
    });
  }

  async getByStatus(status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.tasks.filter(task => task.status === status);
        resolve([...tasks]);
      }, 200);
    });
  }
}

// Create and export singleton instance
export default new TaskService();