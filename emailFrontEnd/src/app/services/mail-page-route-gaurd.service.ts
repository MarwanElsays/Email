import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MailPageRouteGaurdService implements CanActivate {

  constructor(private authService:AuthService,private r:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.authService.accept)return true;
    else{
      this.r.navigateByUrl('');
      return false;
    }
  }
}
