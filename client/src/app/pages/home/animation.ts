import { trigger, transition, animate, style } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1500ms', style({ opacity: 1 })),
  ]),
 
]);
