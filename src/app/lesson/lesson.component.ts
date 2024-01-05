import { Component, Input } from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
  @Input() lesson: Lesson;
}
