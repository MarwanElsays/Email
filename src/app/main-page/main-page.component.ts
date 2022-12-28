import { Component } from '@angular/core';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private s:ConnectorService){}

  Do():boolean{
    return this.s.hideMenu;
  }
}
