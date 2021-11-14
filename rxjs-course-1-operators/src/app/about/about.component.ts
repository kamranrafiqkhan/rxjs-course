import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { concat, fromEvent, interval, merge, noop, Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";
import { createHttpObserveable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    //const interval$ = interval(1000);
    // const interval$ = timer(3000, 1000);
    // const sub = interval$.subscribe((val) => console.log("Stream 1", val));
    // setTimeout(() => sub.unsubscribe(), 5000);
    // const click$ = fromEvent(document, "click");
    // click$.subscribe(
    //   (evt) => console.log(evt),
    //   (err) => console.log(err),
    //   () => console.log("Completed")
    // );


    //***************************CONCAT************************************* */
    // const source1$ = of(1, 2, 3);

    // const source2$ = of(4, 5, 6);

    // const source3$ = of(7, 8, 9);

    // const result$ = concat(source1$, source2$, source3$);

    // result$.subscribe(console.log)



    //***************************MERGE************************************* */
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => val * 10));
    // const result$ = merge(interval1$, interval2$);
    // result$.subscribe(console.log);


    /*********************************Unsubscribe Observable*************************************** */
    // for example if user search something and before getting the results, he modifies the search paramters then unsubscribe previous call
    // const interval$ = interval(1000);
    // const sub = interval$.subscribe(console.log);
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 5000);
    // const https$ = createHttpObserveable('/api/courses');
    // const sub = https$.subscribe(console.log);
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 0);
  }
}
