import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  async ngOnInit(): Promise<void> {
    (await this.taskService.getTasks()).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  async onDeleteTask(task: Task) {
    (await this.taskService.deleteTask(task)).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  async onToggleReminder(task: Task) {
    (
      await this.taskService.updateTask({ ...task, reminder: !task.reminder })
    ).subscribe((updatedTask) => {
      this.tasks = this.tasks.map((t) =>
        t.id !== updatedTask.id ? t : updatedTask
      );
    });
  }
  async onNewTask(task: Task) {
    (await this.taskService.addTask(task)).subscribe((newTask) => {
      this.tasks.push(newTask);
    });
  }
}
