import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Component, OnDestroy, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {ChildrenOutletContexts} from "@angular/router";
import {debounceTime, fromEvent, Subject, takeUntil} from "rxjs";
import {routerAnimation} from "../animation/router-animation";
import {Effect} from "../util/effect";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scene') canvasEl!: ElementRef;

  title = 'PersonalHomepage';
  destroy$ = new Subject<void>();

  isMqlLarge = true;
  isMqlSmall = false;

  navAnchors = [
    { path: '#about', label: 'About Me'},
    { path: '#gallery', label: 'Gallery'},
    { path: '#contact', label: 'Contact'},
  ]

  get currentPath(): string {
    return '#' + location.hash.slice(2);
  }

  constructor(breakpointObserver: BreakpointObserver, private childrenOutletContexts: ChildrenOutletContexts) {
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

  ngAfterViewInit() {
    const canvas = this.canvasEl.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    const effect = new Effect(context, window.innerWidth, window.innerHeight);
    effect.init();

    function animate() {
      effect.update();
      effect.render();
      requestAnimationFrame(animate);
    }

    // animate();

    fromEvent(window, 'resize')
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(_ => {
        effect.resize(window.innerWidth, window.innerHeight);
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getRouteAnimationData() {
    return this.childrenOutletContexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
