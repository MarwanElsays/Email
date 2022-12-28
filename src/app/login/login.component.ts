import { ConnectorService } from 'src/app/services/connector.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { User } from '../Classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private connectorservice: ConnectorService,private authservice:AuthService){}

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    const email:string = this.reactiveForm.get('email')?.value;
    const pass:string = this.reactiveForm.get('password')?.value;

    //const user = new User(email,pass);
    this.connectorservice.users.forEach((u) =>{
      if(u.email == email && u.password == pass){
        this.authservice.accept = true;
      }
    })
  }
}
