import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  title = 'PersonalHomepage';
  destroy$ = new Subject<void>();

  isMqlLarge = true;
  isMqlSmall = false;

  navAnchors = [
    { path: '#about', label: 'About Me'},
    { path: '#gallery', label: 'Gallery'},
    { path: '#contact', label: 'Contact'},
  ]

  constructor(breakpointObserver: BreakpointObserver) {
    this.subBreakPoint(breakpointObserver);
  }

  subBreakPoint(observer: BreakpointObserver) {
    observer
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeUntil(this.destroy$))
      .subscribe((bpState: BreakpointState) => {
        this.isMqlLarge =  bpState.breakpoints[Breakpoints.Medium] || !bpState.matches;
        this.isMqlSmall = bpState.breakpoints[Breakpoints.Small] || bpState.breakpoints[Breakpoints.XSmall];
      })

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
