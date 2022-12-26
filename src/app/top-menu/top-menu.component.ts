import { ConnectorService } from './../services/connector.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {

  constructor(private s:ConnectorService){}

  Do(){
    this.s.hidemenu = !this.s.hidemenu;
  }

}
