import { ConnectorService } from './../services/connector.service';
import { Component, OnInit } from '@angular/core';
import { faBars, faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(private s: ConnectorService) { }
  faBars = faBars;
  faMagnifyingGlass = faMagnifyingGlass;
  faSliders = faSliders;
  hide:boolean = true;
  reactiveForm!:FormGroup;

  ngOnInit(): void {
   this.reactiveForm = new FormGroup({
    sender:new FormControl(null,Validators.email),
    Receiver:new FormControl(null,Validators.email),
    Importance:new FormControl(null),
    Subject:new FormControl(null),
    Body:new FormControl(null),
    Attachments:new FormControl(null),
    Folder:new FormControl(null),
   })
  }

  onSubmit(){
    let SearchArray:string[] = [];
    SearchArray.push(this.reactiveForm.get('sender')?.value);
    SearchArray.push(this.reactiveForm.get('Receiver')?.value);
    SearchArray.push(this.reactiveForm.get('Importance')?.value);
    SearchArray.push(this.reactiveForm.get('Subject')?.value);
    SearchArray.push(this.reactiveForm.get('Body')?.value);
    SearchArray.push(this.reactiveForm.get('Attachments')?.value);
    SearchArray.push(this.reactiveForm.get('Folder')?.value);
    this.hide = false;
    console.log(SearchArray);
  }

  Do() {
    this.s.toggleMenu();
  }

}
