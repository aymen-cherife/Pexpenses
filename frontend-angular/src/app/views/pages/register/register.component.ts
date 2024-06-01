import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { UserService } from '@services/user.service'; // Make sure to import UserService correctly
import { FormsModule } from '@angular/forms';//added this line too for binding models ith inputs in forms. you shouldve told me about it
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [HttpClientModule, FormsModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, IconDirective]//added this line , you should've done it yourslef.
})

export class RegisterComponent {

  user: any = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  };

  constructor(private userService: UserService, private router: Router) { }


  register() {
    if (this.user.password !== this.user.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    this.userService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        alert('Registration successful');

        //Refirect to login page for token generation
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Failed to register. Error: ' + error.message);

      }
    });


  }



}
