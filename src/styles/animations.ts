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

export const scrollOverAnimation = animation([
  animate("0.3s", keyframes([
    style({top: 0, opacity: 1}),
    style({top: '10px', opacity: 0}),
    style({top: '-10px', opacity: 0}),
    style({top: 0, opacity: 1}),
  ]))
])

export const moveInAnimation = animation([
  animate("0.2s ease-out", keyframes([
    style({left: '-400px', opacity: 1}),
    style({left: '0', opacity: 1}),
  ]))
])


export const moveOutAnimation = animation([
  animate("0.2s ease-in", keyframes([
    style({left: '0', opacity: 1}),
    style({left: '-400px', opacity: 1}),
  ]))
])

// TRANSITIONS

export const sideSheetTransition = trigger('moveSideSheet', [
  // keep "out" as a state to correctly fly in loaded window (prevents flickering)
  state('out', style({
    left: '-400px',
    opacity: 1,
  })),
  transition('out => in', [
    style({}),
    useAnimation(moveInAnimation)
  ]),
  transition('in => out', [
    style({}),
    useAnimation(moveOutAnimation)
  ]),
])

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

export const scrollDownTransition = trigger('scrollContent', [
  transition('done => scroll', [
    style({position: 'relative'}),
    useAnimation(scrollOverAnimation)
  ])
])

