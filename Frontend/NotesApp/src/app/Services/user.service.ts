import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IResponseType} from '../Components/login/IResponseType';
import { IGeneralResponseType } from '../IGeneralResponseType';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  url = 'http://localhost:8080/'

  onLogin(loginCred:any){
    return this.httpClient.post<IResponseType>(this.url + 'login', loginCred);
  }

  onCheckUsernameAvailability(username:any){
    let usernameObj = {username:username};
    return this.httpClient.post<IGeneralResponseType>(this.url + 'username', usernameObj);
  }
}
