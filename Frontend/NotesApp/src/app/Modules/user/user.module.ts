import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { SignUpComponent } from 'src/app/Components/sign-up/sign-up.component';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { NotesService } from 'src/app/Services/notes.service';


@NgModule({
  declarations: [LoginComponent, SignUpComponent, DashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ],
  providers: [UserService, NotesService],
  exports: [LoginComponent, SignUpComponent, DashboardComponent]
})
export class UserModule { }
