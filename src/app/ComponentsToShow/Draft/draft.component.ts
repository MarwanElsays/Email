import { Component, OnInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  constructor(){

  }
  faRotateRight = faRotateRight;

  ngOnInit(){
  }

}
