import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";

  ngOnInit(): void {
    // document.addEventListener("click", (evt) => {
    //   console.log(evt);
    //   setTimeout(() => {
    //     console.log("finished.....");
    //     let counter = 0;

    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });
  }
}
