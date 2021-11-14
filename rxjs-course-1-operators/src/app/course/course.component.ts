import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat, forkJoin } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObserveable } from '../common/util';
import { searchLessons } from '../../../server/search-lessons.route';
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];
        //this.course$ = createHttpObserveable('/api/courses/' + this.courseId)
        // .pipe(
        //     debug(RxJsLoggingLevel.INFO, "Course Value")
        // );

        //setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG);

        const course$ = createHttpObserveable('/api/courses/' + this.courseId);

        const lesson$ = this.loadLessons();

        forkJoin(course$, lesson$)
            .pipe(
                tap(([course, lessons]) => {
                    console.log('course: ', course);
                    console.log('lessons', lessons);
                })
            )
            .subscribe();
    }

    ngAfterViewInit() {

        // this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         startWith(''),
        //         map(event => event?.target?.value),
        //         debug(RxJsLoggingLevel.TRACE, "Search"),
        //         debounceTime(400), // debounceTime vs throttle
        //         distinctUntilChanged(),
        //         switchMap(search => this.loadLessons(search)), //cancels https calls if search is modified and send http call with updated search paramters
        //         debug(RxJsLoggingLevel.DEBUG, "Lesson Value")
        //     );

        // const initialLessopns$ = this.loadLessons();
        // this.lessons$ = concat(initialLessopns$, searchLessons$);

        this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                startWith(''),
                map(event => event?.target?.value),
                debug(RxJsLoggingLevel.TRACE, "Search"),
                debounceTime(400), // debounceTime vs throttle
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search)), //cancels https calls if search is modified and send http call with updated search paramters
                debug(RxJsLoggingLevel.DEBUG, "Lesson Value")
            );
    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObserveable('/api/lessons?courseId=' + this.courseId + '&pageSize=100&filter=' + search)
            .pipe(
                map(res => res["payload"]
                )
            )
    }



}
