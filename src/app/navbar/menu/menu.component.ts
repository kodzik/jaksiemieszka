import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { commentsView } from 'src/app/comments/commentsView';
import { FabService } from 'src/app/fab/fab.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  username: string = "";
  authenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private fabService: FabService,
    private router: Router
    ) { }

  items: MenuItem[];

  ngOnInit() {
    this.authenticated = this.getUser(this.authService.isAuthenticated(), localStorage.getItem('username'))

    if(this.authenticated){
      
      this.items = [
        {
          label: this.username,
          items: [
            {
              label: 'Dodaj komentarz', 
              icon: 'pi pi-fw pi-plus',
              command: () => {
                if(this.authService.isAuthenticated()){
                  this.fabService.changeCommentsView(commentsView.Add)
                }
              }
            },
            {
              label: 'Wyloguj', 
              icon: 'pi pi-fw pi-power-off',
              command: () => {
                this.authService.deauthenticate()
              }
            }
          ]
        },

      ];
    } else {
      this.items = [
        {
          label: 'Zaloguj', 
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.router.navigate(['/account/login']);
          }
        }
      ]
    }
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
