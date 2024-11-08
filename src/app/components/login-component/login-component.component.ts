import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  submitted = false;
  errMsg: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.status === 'fail') {
          console.log('Error:', res.message);
          this.errMsg = res.message;
        } else {
          console.log(res);
          sessionStorage.setItem('name', res.data.username);
          sessionStorage.setItem('address', res.data.address);
          sessionStorage.setItem('uid', res.data._id);
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log('Error:', err);
        this.errMsg = err.error.message;
        setTimeout(() => {
          this.errMsg = '';
        }, 3000);
      }
    });
  }
}
