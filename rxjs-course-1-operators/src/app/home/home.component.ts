import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObserveable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // beginnerCourses: Course[];

    // advancedCourses: Course[];

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const http$: Observable<Course[]> = createHttpObserveable("/api/courses");

        const courses$ = http$
            .pipe(
                // catchError(err => {
                //     console.log("Error", err);
                //     return throwError(err);
                // }),
                // finalize(() => {
                //     console.log("Finalize Executed")
                // }),
                tap(() => console.log("HTTP Request Executed")),
                map(
                    (res: any) => {
                        return Object.values(res['payload'])
                    }),
                shareReplay(),
                // retryWhen(error => error.pipe(
                //     delayWhen(() => timer(2000))
                // ))
            ) as Observable<Course[]>;

        courses$.subscribe();

        this.beginnerCourses$ = courses$
            .pipe(

                map((courses) => courses.filter(c => c.category == 'BEGINNER')),
            );

        this.advancedCourses$ = courses$.pipe(
            map((courses) => courses.filter(c => c.category == 'ADVANCED'))
        );

        courses$.subscribe(
            (courses: Array<Course>) => {
                //this.beginnerCourses = courses.filter(c => c.category == 'BEGINNER');
                //this.advancedCourses = courses.filter(c => c.category == 'ADVANCED');
            },
            err => console.log(err),
            () => console.log("Completed")
        );

    }

}
