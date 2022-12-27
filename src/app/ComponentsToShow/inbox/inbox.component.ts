import { Component } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  constructor(){}
  
  faRotateRight = faRotateRight;
  styleIt:boolean = true;
}
