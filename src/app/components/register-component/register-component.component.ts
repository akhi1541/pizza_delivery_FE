import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
})
export class RegisterComponentComponent {
  registerForm: FormGroup;
  submitted = false;
  errMsg: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        sessionStorage.setItem('name', res.data.username);
        sessionStorage.setItem('address', res.data.address);
        sessionStorage.setItem('uid', res.data._id);
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log('Error:', err);
        this.errMsg = err.error.message;
        setTimeout(() => {
          this.errMsg = '';
        }, 3000);
      }
    });
  }
}
