import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if there's no token
    return router.parseUrl('/login');
  }
  return true;  // Allow route activation if there is a token
};
