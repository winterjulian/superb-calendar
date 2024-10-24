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

// EXAMPLE:
export const transitionAnimation = animation([
  style({
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

export const triggerAnimation = trigger('openClose', [
  transition('open => closed', [
    useAnimation(transitionAnimation, {
      params: {
        opacity: 1,
        backgroundColor: 'red',
        time: '1s',
      },
    }),
  ]),
]);
// EXAMPLE-END

// ANIMATIONS

export const leftDisappearAnimation = animation([
  animate("0.5s", keyframes([
    style({scale: 1, left: 0, opacity: 1}),
    style({scale: 0.9, left: 0, opacity: 1}),
    style({scale: 0.9, left: '-30px', opacity: 0}),
  ]))
]);

export const rightAppearAnimation = animation([
  animate("0.5s", keyframes([
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

