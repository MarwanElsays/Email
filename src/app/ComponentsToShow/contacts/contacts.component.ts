import { User } from './../../Classes/user';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  constructor(private s:ConnectorService){

  }

  ngOnInit(){
    this.user.addContacts('maro',this.s.users);
  }

  user:User = this.s.activeUser;
  faRotateRight = faRotateRight;

}
