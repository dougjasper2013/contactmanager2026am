import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcontacts',
  imports: [CommonModule],
  providers: [ContactService],
  templateUrl: './addcontacts.component.html',
  styleUrl: './addcontacts.component.css'
})
export class AddcontactsComponent {

  constructor(private contactService: ContactService, private http: HttpClient) {
    // no other statements required
  }

}
