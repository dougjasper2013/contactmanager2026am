import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, RouterLink],
  providers: [ContactService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})

export class ContactsComponent implements OnInit {

  title = "ContactManager2026AM";

  public contacts: Contact[] = [];

  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', dob:'', imageName:'' };

  error = '';
  success = '';

  constructor(private contactService: ContactService, private http: HttpClient, public authService: Auth) {
    // no other statements required
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getAll().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        this.success = 'successful list retrieval';
        console.log(this.success);
        console.log(this.contacts);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteContact(contactID: number): void {
    const confirmed = window.confirm("Are you sure you want to delete this contact?");

    if (!confirmed) {
      return;
    }

    this.contactService.delete(contactID).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(contact => contact.contactID && +contact.contactID != +contactID);
        this.success = "Deleted successfully";
      },
      error: err => this.error = err.message
    });
  }


}
