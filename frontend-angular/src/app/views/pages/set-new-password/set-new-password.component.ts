import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule, HttpClientModule, FormsModule, CardGroupComponent, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective]
})
export class SetNewPasswordComponent implements OnInit {


  newPassword: string = '';
  token: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log('hit on init before binding');
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    console.log(this.token);
  }

  setNewPassword(): void {
    if (this.newPassword && this.token) {
      this.userService.setNewPassword(this.token, this.newPassword).subscribe({
        next: () => {
          alert('Your password has been reset successfully');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('There was an error. Please try again.');
        }
      });
    }
  }
}
