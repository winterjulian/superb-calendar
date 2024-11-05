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

export const overWriteAnimation = animation([
  animate("0.3s", keyframes([
    style({top: 0, opacity: 1}),
    style({top: '10px', opacity: 0}),
    style({top: '-10px', opacity: 0}),
    style({top: 0, opacity: 1}),
  ]))
])

// TRANSITIONS

export const reloadTransition = trigger('reloadContent', [
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

export const scrollDownAnimation = trigger('scrollContent', [
  transition('done => scroll', [
    style({position: 'relative'}),
    useAnimation(overWriteAnimation)
  ])
])

