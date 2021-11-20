import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge } from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        /************************* Subject does not return any thing if subscribed again. no cache******************************* */
        // const subject = new Subject();

        // const series$ = subject.asObservable();

        // series$.subscribe(val => console.log("first sub: ", val));

        // subject.next(1)
        // subject.next(2)
        // subject.next(3)

        // setTimeout(() => {
        //     series$.subscribe(val => console.log("late sub: ", val));
        // }, 3000)

        //subject.complete();

        /********************************BehaviorSubject Returns last emitted value if subscribed again. cache last emitted value********************** */

        // const subject = new BehaviorSubject(0);

        // const series$ = subject.asObservable();

        // series$.subscribe(val => console.log("first sub: ", val));

        // subject.next(1)
        // subject.next(2)
        // subject.next(3)

        // setTimeout(() => {
        //     series$.subscribe(val => console.log("late sub: ", val)); 
        // }, 3000)

        //subject.complete();





        /******************* AsyncSubject will wait for observable completion before emitting any of the value to the multiple subscribers*********************** */
        // best for AsyncSubject is ideal for handling long running calculation where we only want to receive last value.
        // const subject = new AsyncSubject();

        // const series$ = subject.asObservable();

        // series$.subscribe(val => console.log("first sub: ", val));

        // subject.next(1)
        // subject.next(2)
        // subject.next(3)

        // setTimeout(() => {
        //     series$.subscribe(val => console.log("Second sub: ", val));
        // }, 3000)

        // subject.complete();



        /******************** Like the name suggests, is going to Replay the complete observable to all late subscribers ****************** */
        // const subject = new ReplaySubject();

        // const series$ = subject.asObservable();

        // series$.subscribe(val => console.log("first sub: ", val));

        // subject.next(1)
        // subject.next(2)
        // subject.next(3)

        // setTimeout(() => {
        //     series$.subscribe(val => console.log("Second sub: ", val));

        //     subject.next(4);
        // }, 3000)

        // //subject.complete();

    }


}






