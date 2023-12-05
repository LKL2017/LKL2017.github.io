import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const routerAnimation = trigger('routerAnimations',[
  transition('* <=> *', [
    style({
      position: 'relative',
      overflow: 'hidden',
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
      })
    ], { optional: true }),
    query(':enter', [
      style({
        transform: 'translateY(100%)',
      })
    ], { optional: true }),
    group([
      query(':enter', [
        animate('1000ms ease-out', style({
          transform: 'none',
        }))
      ], { optional: true }),
      query(':leave', [
        animate('1000ms ease-out', style({
          transform: 'translateX(100%)',
          opacity: 0
        }))
      ], { optional: true }),
      query(':self', [
        animate('1000ms ease', style({
          height: '*',
        })),
      ], { optional: true }),
    ])
  ])
]);
