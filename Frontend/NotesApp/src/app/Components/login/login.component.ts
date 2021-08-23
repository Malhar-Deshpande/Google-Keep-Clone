import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { IResponseType } from './IResponseType';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  constructor(private userService: UserService, private router: Router) { }

  LoginSubscribe!: Subscription;

  hide: boolean = true;

  ngOnInit(): void {
  }

  login(loginData: any) {
    this.LoginSubscribe = this.userService.onLogin(loginData).subscribe(response => {
      if (response['status'] == 'success') {
        sessionStorage['token'] = response['token']
        let data2: any = response['data']
        sessionStorage['userId'] = data2['userId']
        this.router.navigate(['/home'])

      }
    })
  }

  ngOnDestroy(): void {
    if (this.LoginSubscribe) {
      this.LoginSubscribe.unsubscribe()
    }
  }

}
