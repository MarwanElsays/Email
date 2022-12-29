import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Classes/user';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private connectorservice: ConnectorService,private r:Router){}

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname:new FormControl(null,Validators.required),
      lastname: new FormControl(null,Validators.required),
      birthDate: new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    const firstname:string = this.reactiveForm.get('firstname')?.value;
    const lastname:string = this.reactiveForm.get('lastname')?.value;
    const birthdate:string = this.reactiveForm.get('birthDate')?.value;
    const email:string = this.reactiveForm.get('email')?.value;
    const pass:string = this.reactiveForm.get('password')?.value;

    let user = new User(email,pass);
    this.connectorservice.users.push(user);
    console.log(firstname,lastname,birthdate,email,pass);
    this.r.navigateByUrl('');
  }
}
