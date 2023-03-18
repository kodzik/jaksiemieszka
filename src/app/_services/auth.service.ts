import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private userSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());
  public user: Observable<boolean>;
  userData: any; // Save logged in user data

  constructor(
    private router: Router,
    private http: HttpClient,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    // this.user = this.userSubject.asObservable();

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

    // Sign in with email/password
    SignIn(email: string, password: string) {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user);
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['home']);
            }
          });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

    SignUp(email: string, password: string) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

      // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

    //TODO check if 'any' can be changed to some type
    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      return userRef.set(userData, {
        merge: true,
      });
    }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ;
    //&& user.emailVerified !== false ? true : false
  }

  get userName(): string{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.appName;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }


  // public get userValue(): boolean {
  //   return this.userSubject.value;
  // }

  // User is logged in
  // isAuthenticated(): boolean {
  //   // TODO
  //   return false;
  // }

  // // Handle authentication errors
  // private errorHandler(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error(`authentication error: ${error.error.message}`);
  //   } 
  //   if(error.error?.username){
  //     return throwError('Ta nazwa użytkownika jest już zajęta.');
  //   }
  //   else {
  //     console.error(`bad auth response: ${error.status}: ${error.statusText} ${JSON.stringify(error.error)}`);
  //   }
  //   return throwError('Nieprawidłowe hasło lub nazwa użytkownika.');
  // }

}