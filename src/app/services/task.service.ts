import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  async getTasks(): Promise<Observable<Task[]>> {
    try {
      const { data } = await axios(`/api/tasks`);
      return of(data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  async deleteTask(task: Task): Promise<Observable<void>> {
    try {
      const { data } = await axios.delete(`/api/tasks?id=${task.id}`);
      console.log(data);
      return of(null);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  async updateTask(task: Task): Promise<Observable<Task>> {
    try {
      const { data } = await axios.put(`/api/tasks?id=${task.id}`, task);
      console.log(data);
      return of(data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  async addTask(task: Task): Promise<Observable<Task>> {
    try {
      const { data } = await axios.post(`/api/tasks`, task);
      console.log(data);
      return of(data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}
