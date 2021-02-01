import { Component, OnInit } from '@angular/core';
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";
import { confirm, Page } from '@nativescript/core';

import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth"

@Component({
  selector: 'ns-login',
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isLoading = false;
  fingerprintAvailable = false;
  faceIdAvailable = false;
  private fingerprintAuth: FingerprintAuth;

  constructor(private router: Router, private userService: UserService, page: Page) {
    page.actionBarHidden = true;

    this.user = new User();
    this.fingerprintAuth = new FingerprintAuth()
  }

  ngOnInit() {
    this.doCheckAvailable()
  }

  doCheckAvailable() {
    this.fingerprintAuth
      .available()
      .then((result: BiometricIDAvailableResult) => {
        console.log("doCheckAvailable result: " + JSON.stringify(result));
        if (result.touch) {
          this.fingerprintAvailable = true;
        }
        if (result.face) {
          this.faceIdAvailable = true;
        }
      })
      .catch(err => {
        console.log("doCheckAvailable error: " + err);
      });
  }

  checkFingerprint() {
    var authName = this.faceIdAvailable ? "Face ID" : "your fingerprint";
    confirm({
      title: 'Ang with NS',
      message: `Would you like to use ${authName} to authenticate?`,
      okButtonText: "Yes",
      cancelButtonText: "No"
    }).then((result) => {
      if (result) {
        this.fingerprintAuth.verifyFingerprint({
          title: authName,
          message: "Authenticate with " + authName,
          authenticationValidityDuration: 10
        })
          .then(() => {
            this.router.navigate(["/home"])
            console.log(' Succesfully verifyed fingerprint')
          })
          .catch(err => console.log('Error ', err))
      }
    })
  }

  submit() {
    this.isLoading = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => {
          this.router.navigate(["/home"])
          this.isLoading = false;
        },
        (exception) => {
          if (exception.error && exception.error.description) {
            alert(exception.error.description);
          } else {
            alert(exception)
          }
          this.isLoading = false;
        }
      );
  }

  // Method for signing up the user (useing the API from NAtivescript)
  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
          this.isLoading = false;
        },
        (exception) => {
          if (exception.error && exception.error.description) {
            alert(exception.error.description);
          } else {
            alert(exception)
          }
          this.isLoading = false;
        }
      );
  }

  // Switch between the Login screen and the screen for Sign up 
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
