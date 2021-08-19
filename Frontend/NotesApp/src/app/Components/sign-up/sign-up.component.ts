import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  UsernameSubscription!: Subscription
  signUpForm: FormGroup
  usernames: string[] = [];
  isUsernameInvalid: boolean = false;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), this.usernameValidator()]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@gmail.com$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&^+=]).*$')]],
      confirmPassword: ['', [Validators.required, RxwebValidators.compare({ fieldName: 'password' })]]
    })
  }


  ngOnInit(): void { }

  getUsername() {
    return this.signUpForm.get('userName');
  }

  getEmail() {
    return this.signUpForm.get('email');
  }

  getPassword() {
    return this.signUpForm.get('password');
  }

  getConfirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  getErrorMessageForUserName() {
    let returnValue: string = '';

    if (this.signUpForm.get('userName')?.hasError('required')) {
      returnValue = 'Username cannot be empty'
    }

    if (this.signUpForm.get('userName')?.hasError('minlength')) {
      returnValue = 'Username is too short';
    }

    if (this.isUsernameInvalid == true) {
      returnValue = 'Username already taken'
    }
    return returnValue;
  }

  getErrorMessageForEmail() {
    let returnValue: string = '';

    if (this.signUpForm.get('email')?.hasError('required')) {
      returnValue = 'Email cannot be empty'
    }

    if (this.signUpForm.get('email')?.hasError('pattern')) {
      returnValue = 'Email not valid';
    }
    return returnValue;
  }

  getErrorMessageForPassword() {
    let returnValue: string = '';

    if (this.signUpForm.get('password')?.hasError('required')) {
      returnValue = 'Password cannot be empty'
    }

    if (this.signUpForm.get('password')?.hasError('pattern')) {
      returnValue = 'Password not strong enough';
    }
    return returnValue;
  }

  getErrorMessageForConfirmPassword() {
    let returnValue: string = '';

    if (this.signUpForm.get('confirmPassword')?.hasError('required')) {
      returnValue = 'Password cannot be empty'
    }

    if (this.signUpForm.get('confirmPassword')?.hasError('compare')) {
      returnValue = 'Password Not matching';
    }
    return returnValue;
  }

  checkUsernameAvail(event: any) {
    this.UsernameSubscription = this.userService.onCheckUsernameAvailability(event.target.value).subscribe(response => {
      if (response['status'] == 'success') {
        if (response['data'] == false) {
          this.isUsernameInvalid = true;
        }
        else {
          this.isUsernameInvalid = false;
        }
      }
    });
  }

  registerUser(data: any) {
    console.log(data)
  }

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.isUsernameInvalid == true ? { invalidname: true } : null;
  }

  ngOnDestroy(): void {
    if (this.UsernameSubscription) {
      this.UsernameSubscription.unsubscribe();
    }
  }
}
