import { BackendCommunicatorService } from './../services/backend-communicator.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private r: Router,private backcomm:BackendCommunicatorService) { }

  reactiveForm!: FormGroup;
  wrongacc:boolean = false;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }

  onSubmit() {
    const email: string = this.reactiveForm.get('email')?.value;
    const password: string = this.reactiveForm.get('password')?.value;

    if (this.reactiveForm.valid){
      this.backcomm.verifySignUp(email,password).subscribe((val)=>{
        if(val == "false") this.wrongacc = true;
        else{
          this.wrongacc = false;
          this.r.navigateByUrl('');
        } 
      });
    }
  }

}
