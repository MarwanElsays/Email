import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGaurdService implements CanActivate {

  constructor(private authService:AuthService,private r:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(window.localStorage.getItem('status') === 'true'){
        this.r.navigateByUrl('/mail-page');
        return false;
    }
    else{
      return true;
    }
  }
}
