import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, User } from '../Classes/user';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private s: ConnectorService, private r: Router) { }

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      gender: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    const firstName: string = this.reactiveForm.get('firstName')?.value;
    const lastName: string = this.reactiveForm.get('lastName')?.value;
    const birthDate: string = this.reactiveForm.get('birthDate')?.value;
    const email: string = this.reactiveForm.get('email')?.value;
    const password: string = this.reactiveForm.get('password')?.value;
    const genderString: string = this.reactiveForm.get('gender')?.value;

    let gender: Gender = Gender.male;

    switch (genderString) {
      case 'Male': gender = Gender.male;     break;
      case 'Female': gender = Gender.female; break;
    }

    const user = new User(firstName, lastName, new Date(birthDate), gender, email, password);
    this.s.users.push(user);     //send to backend
    console.log(this.reactiveForm);
    if (this.reactiveForm.valid)
      this.r.navigateByUrl('');
  }
}
