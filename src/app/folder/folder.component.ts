import { Component, OnInit } from '@angular/core';
import { Email } from '../Classes/Email';
import { BackendCommunicatorService } from '../services/backend-communicator.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  constructor(private backend: BackendCommunicatorService) {}

  ngOnInit(): void {
    this.backend.getEmailsList()
  }
  
  private name!: string;
  private emails!: Email[];
  
}
