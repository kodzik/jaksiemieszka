import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean = false;
  username: string;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authenticated = this.getUser(this.authService.isAuthenticated(), localStorage.getItem('username'))
  }

  login(){
    this.router.navigate(['/account/login']);
  }

  getUser(isAuthenticated: boolean, username: string | null): boolean{
    let gotUser: boolean = false;
    if(isAuthenticated && username !== null){
      this.username = username;
      gotUser = true;
    }
    return gotUser
  }

}
