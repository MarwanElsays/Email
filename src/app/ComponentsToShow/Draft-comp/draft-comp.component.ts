import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-draft-comp',
  templateUrl: './draft-comp.component.html',
  styleUrls: ['./draft-comp.component.css']
})
export class DraftCompComponent implements OnInit {

  constructor(private ar:ActivatedRoute){

  }
  ngOnInit(){
  }

}
