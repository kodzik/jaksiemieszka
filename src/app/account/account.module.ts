import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimesharedModule } from '../_shared/primeshared/primeshared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SignInComponent,
    SignUpComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    PrimesharedModule,
  ],
})
export class AccountModule {}
