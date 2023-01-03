import { lastValueFrom } from 'rxjs';
import { AuthService } from './../services/auth-service.service';
import { ConnectorService } from 'src/app/services/connector.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendCommunicatorService } from '../services/backend-communicator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private connectorservice: ConnectorService, private r: Router, private authserv: AuthService,private commback:BackendCommunicatorService) { }

  reactiveForm!: FormGroup;
  show:boolean = false;

  ngOnInit(): void {
    this.authserv.accept = false;
    window.localStorage.setItem('status','false');
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  async onSubmit() {
    const email: string = this.reactiveForm.get('email')?.value;
    const pass: string = this.reactiveForm.get('password')?.value;
    let Go: boolean = false;
    this.authserv.accept = false;

    let val = await lastValueFrom(this.commback.verifySignIn(email,pass));
    if(val.toString() != "false"){
      Go = true;
      this.connectorservice.activeUserID = parseInt(val);
      this.authserv.accept = true;
      this.r.navigateByUrl('mail-page');
      window.localStorage.setItem('status','true');
      window.localStorage.setItem('userID',val);
    }else{
      this.show = true;
    }
  }
}


// let e = new User("maro","maro",new Date(),Gender.male,"maro","mmmm");
// console.log(JSON.stringify(e));