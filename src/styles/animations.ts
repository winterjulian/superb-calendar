import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
  keyframes,
  state
} from '@angular/animations';

// ANIMATIONS

export const leftDisappearAnimation = animation([
  animate("0.4s", keyframes([
    style({scale: 1, left: 0, opacity: 1}),
    style({scale: 0.9, left: 0, opacity: 1}),
    style({scale: 0.9, left: '-30px', opacity: 0}),
  ]))
]);

export const rightAppearAnimation = animation([
  animate("0.4s", keyframes([
    style({scale: 0.9, left: '30px' , opacity: 0}),
    style({scale: 0.9, left: 0, opacity: 1}),
    style({scale: 1, left: 0, opacity: 1}),
  ]))
]);

// TRANSITIONS

export const reloadAnimation = trigger('reloadContent', [
  transition('done => reload', [
    style({position: 'relative'}),
    useAnimation(leftDisappearAnimation)
  ]),
  state('reload', style({
    opacity: 0,
    left: '30px',
  })),
  transition('reload => done', [
    style({position: 'relative'}),
    useAnimation(rightAppearAnimation)
  ])
])

