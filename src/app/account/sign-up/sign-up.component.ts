import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: UntypedFormGroup;
  loading: boolean = false;
  submitted = false;
  error: string = '';

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
      .SignUp(this.f.email.value, this.f.password.value)
      .catch((error) => {
        this.error = this.authService.errorHandler(error);
        this.loading = false;
      });
  }
}
