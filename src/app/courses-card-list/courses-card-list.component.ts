import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent {
  @Input() courses: Course[];
  @Output() private coursesChanged = new EventEmitter();
  constructor(private dialog: MatDialog) {}
  ngOnInit() {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result), //filter only the cases corresponding to successfull save
        tap(() => {
          this.coursesChanged.emit();
        })
      )
      .subscribe();
  }
}
