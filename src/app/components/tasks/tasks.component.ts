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

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onDeleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((value) => {
      // delete is not actually returning anything here
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  onToggleReminder(task: Task) {
    this.taskService
      .updateTask({ ...task, reminder: !task.reminder })
      .subscribe((newTask) => {
        this.tasks = this.tasks.map((t) => (t.id !== task.id ? t : newTask));
      });
  }
}
