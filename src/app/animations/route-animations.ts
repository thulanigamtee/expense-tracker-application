import { transition, trigger, style, animate } from '@angular/animations';

export const fadeIn = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ transform: 'translateY(-20px)', opacity: '0' }),
    animate(
      '500ms ease-in-out',
      style({ transform: 'translateY(0)', opacity: '1' })
    ),
  ]),
]);
