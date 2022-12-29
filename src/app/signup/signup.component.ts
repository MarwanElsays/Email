import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      email:new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    const email:string = this.reactiveForm.get('email')?.value;
    const pass:string = this.reactiveForm.get('password')?.value;

  }
}
