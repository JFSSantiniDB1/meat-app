import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  navigateTo!: string

  constructor(private fb: FormBuilder,
      private notificationService: NotificationService,
      private loginService: LoginService,
      private activateRoute: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
    this.navigateTo = this.activateRoute.snapshot.params['to'] || btoa('/')
  }

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(user => this.notificationService.notify(`Bem vindo(a), ${user.name}`),
    response => this.notificationService.notify(`${response.error.message}`),
    () => {
      this.router.navigate([ atob(this.navigateTo) ])
    });
  }

}
