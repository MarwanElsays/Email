import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor() {}
  accept:boolean = window.localStorage.getItem('status') === 'true';
  
}
