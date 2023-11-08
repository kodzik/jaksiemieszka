import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loading: boolean = false;
  submitted = false;
  error: string = '';
  form: UntypedFormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.loading = false;
      return;
    }
    this.authService
      .SignIn(this.f.email.value, this.f.password.value)
      .catch((error) => {
        this.error = this.authService.errorHandler(error);
        this.loading = false;
      });
  }
}
