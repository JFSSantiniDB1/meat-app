import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { filter, map, Observable } from "rxjs";
import { MEAT_API } from "src/app/app.api";
import { User } from "./user.model";
import { NavigationEnd, Router } from '@angular/router'

@Injectable()
export class LoginService{

    user: User | undefined
    lastUrl: string = ''

    constructor(private http:HttpClient, private router: Router) {
        this.router.events
        .pipe(filter(e => e instanceof NavigationEnd),
         map((e) => {return e as NavigationEnd;}))
        .subscribe(e => {
            this.lastUrl = e.url;
        })
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
        .pipe(map((resp) => {
            this.user = resp;
            return resp;
          }))
    }

    logout(){
        this.user = undefined;
        if(this.lastUrl === '/order')
            this.handleLogin();
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa( path ?? '')])
    }
}