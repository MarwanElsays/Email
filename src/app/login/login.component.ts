import { AuthService } from './../services/auth-service.service';
import { ConnectorService } from 'src/app/services/connector.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from '../Classes/EmailData';
import { Gender, User } from '../Classes/user';
import { BackendCommunicatorService } from '../services/backend-communicator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private connectorservice: ConnectorService, private r: Router, private authserv: AuthService,private commback:BackendCommunicatorService) { }

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.authserv.accept = false;
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    const email: string = this.reactiveForm.get('email')?.value;
    const pass: string = this.reactiveForm.get('password')?.value;

    //const user = new User(email,pass);
    let Go: boolean = false;
    // this.connectorservice.users.forEach((u) => {
    //   if (u.email == email && u.password == pass) {
    //     Go = true;
    //   }
    // })
    this.commback.verifySignIn(email,pass).subscribe((val)=>{
      if(val != "false"){
        this.connectorservice.activeUserID = parseInt(val);
        Go = true;
      }
    })

    if (Go) {
      this.authserv.accept = true;
      this.r.navigateByUrl('mail-page');
    }
  }
}


// let e = new User("maro","maro",new Date(),Gender.male,"maro","mmmm");
// console.log(JSON.stringify(e));