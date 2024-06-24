import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text: string;
  day: string;
  reminder: boolean = false;
  @Output() onNewTask: EventEmitter<Task> = new EventEmitter();
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) return alert('Please add a task!');
    if (!this.day) return alert('Please add a day!');

    const newTask: Task = {
      task: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onNewTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;

    this.uiService.toggleAddTask();
  }
}
