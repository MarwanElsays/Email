import { ConnectorService } from './../services/connector.service';
import { Component } from '@angular/core';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {

  constructor(private s: ConnectorService) { }
  faBars = faBars;
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;


  Do() {
    this.s.toggleMenu();
  }

}
