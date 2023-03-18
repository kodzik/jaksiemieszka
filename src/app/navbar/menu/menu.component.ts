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

  // username: string = "";

  constructor(
    private authService: AuthService,
    private fabService: FabService,
    private router: Router
    ) { }

  items: MenuItem[];

  ngOnInit() {
    console.log(this.userName);
    
    if(this.isLoggedIn){
      
      this.items = [
        {
          label: this.userName,
          items: [
            {
              label: 'Dodaj komentarz', 
              icon: 'pi pi-fw pi-plus',
              command: () => {
                // if(this.authService.isLoggedIn){
                  this.fabService.changeCommentsView(commentsView.Add)
                // }
              }
            },
            {
              label: 'Wyloguj', 
              icon: 'pi pi-fw pi-power-off',
              command: () => {
                this.authService.SignOut()
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
            this.router.navigate(['/account/sign-in']);
          }
        }
      ]
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn
  }

  get userName(): string {
    return this.authService.userName
  }

  // getUser(isAuthenticated: boolean, username: string | null): boolean{
  //   if(isAuthenticated && username !== null){
  //     this.username = username;
  //     return true;
  //   } else return false;
  // }
}
