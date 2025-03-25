import { NgStyle } from '@angular/common';
import { UserService } from '@services/user.service'; // Make sure to import UserService correctly
import { Router, ActivatedRoute } from '@angular/router';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//added this line too for binding models ith inputs in forms. you shouldve told me about it
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { Component } from '@angular/core';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule, HttpClientModule, FormsModule, CardGroupComponent, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective]//added this line , you should've done it yourslef.

})
export class PasswordResetComponent {
  email: string = '';

  constructor(private userService: UserService, private router: Router) { }

  requestReset(): void {
    this.userService.resetPassword(this.email).subscribe({
      next: () => {
        alert('Password reset link has been sent to your email');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Email doesnt exist, please try again');
      }
    });
  }
}