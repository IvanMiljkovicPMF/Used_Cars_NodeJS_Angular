import { CanActivateFn } from '@angular/router';

export const noauthGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
