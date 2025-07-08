import React from "react";
import Error from "@/components/ui/Error";
import reviewsData from "@/services/mockData/reviews.json";

class ReviewService {
  constructor() {
    this.reviews = [...reviewsData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.reviews]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const review = this.reviews.find(review => review.Id === parseInt(id));
        if (review) {
          resolve({ ...review });
        } else {
          reject(new Error('Review not found'));
        }
      }, 200);
    });
  }

  async create(review) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          ...review,
          Id: Math.max(...this.reviews.map(r => r.Id)) + 1,
          status: 'pending'
        };
        this.reviews.push(newReview);
        resolve({ ...newReview });
      }, 400);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.reviews.findIndex(review => review.Id === parseInt(id));
        if (index !== -1) {
          this.reviews[index] = { ...this.reviews[index], ...updates };
          resolve({ ...this.reviews[index] });
        } else {
          reject(new Error('Review not found'));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.reviews.findIndex(review => review.Id === parseInt(id));
        if (index !== -1) {
          const deletedReview = this.reviews.splice(index, 1)[0];
          resolve({ ...deletedReview });
        } else {
          reject(new Error('Review not found'));
        }
      }, 250);
    });
  }

  async getByEmployee(employeeId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reviews = this.reviews.filter(review => review.employeeId === employeeId.toString());
        resolve([...reviews]);
      }, 250);
    });
  }

  async getByStatus(status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reviews = this.reviews.filter(review => review.status === status);
        resolve([...reviews]);
      }, 200);
    });
  }
}

export default new ReviewService();