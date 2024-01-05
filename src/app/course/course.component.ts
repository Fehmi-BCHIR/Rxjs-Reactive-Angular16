import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map, startWith, tap } from 'rxjs/operators';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {
  data$: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}
  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get('courseId'));

    const course$ = this.coursesService
      .loadCourseById(courseId)
      .pipe(startWith(null)); //make sure that the course observable is initialized

    const lessons$ = this.coursesService
      .loadAllCourseLessons(courseId)
      .pipe(startWith([]));

    this.data$ = combineLatest([course$, lessons$]).pipe(
      //combineLatest is going to wait for all the observables to emit its first value
      map(([course, lessons]) => {
        return {
          course,
          lessons,
        };
      }),
      tap(console.log)
    );
  }
}
