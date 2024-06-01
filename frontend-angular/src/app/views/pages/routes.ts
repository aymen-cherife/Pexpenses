
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register'
    }
  },
  {
    path: 'reset_password',
    loadComponent: () => import('./password-reset/password-reset.component').then(m => m.PasswordResetComponent),
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'set_new_password/:token',
    loadComponent: () => import('./set-new-password/set-new-password.component').then(m => m.SetNewPasswordComponent),
    data: {
      title: 'Set New Password'
    }
  },

  {
    path: 'test',
    loadComponent: () => import('./tests/httpClientTest.component').then(m => m.RegisterTestComponent),
    data: {
      title: 'Register Page'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
