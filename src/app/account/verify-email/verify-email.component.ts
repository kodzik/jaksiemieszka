import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  constructor(public authService: AuthService) {}
}
