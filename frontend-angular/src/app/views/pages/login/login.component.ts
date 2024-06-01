import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { UserService } from '@services/user.service'; // Make sure to import UserService correctly
import { FormsModule } from '@angular/forms';//added this line too for binding models ith inputs in forms. you shouldve told me about it
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [HttpClientModule, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})

export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  user = {
    email: '',
    password: ''
  };


  login() {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        alert('Login successful');

        //redirect to dashboard
        this.router.navigate(['/dashboard']); // Adjust the path as needed

      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed: ' + (error.error.message || error.message));
      }
    });

  }

}
