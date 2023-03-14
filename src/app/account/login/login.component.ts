import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registration: boolean = false;
  registerSuccess: boolean = false;

  form: UntypedFormGroup;
  submitted = false;
  loading: boolean = false;
  returnUrl: string;
  error: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  register(){
    this.registration = !this.registration

    if(this.registration){
      this.form.reset()
      
      this.form.addControl('confirmedPassword', new UntypedFormControl('', [Validators.required, this.validateAreEqual.bind(this)]))
      this.form.controls['username'].addValidators([Validators.minLength(5), Validators.maxLength(15)])
    }
  }

  private validateAreEqual(fieldControl: UntypedFormControl) {
    return fieldControl.value === this.f.password.value ? null : { NotEqual: true };
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    if(this.registration){
      this.authService.register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          if(this.error){ this.error = '' };
          this.registerSuccess = true; this.registration = false; this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
    } else{
      this.authService.authenticate(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
      });
    }

  }

}
