import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcontacts',
  imports: [CommonModule, FormsModule],
  providers: [ContactService],
  templateUrl: './addcontacts.component.html',
  styleUrl: './addcontacts.component.css'
})
export class AddcontactsComponent implements OnInit {

  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', dob:'', imageName:'' };

  error = '';
  success = '';

  constructor(private contactService: ContactService, private http: HttpClient, private router: Router) {
    // no other statements required
  }

  ngOnInit(): void {
    
  }

  addContact(f: NgForm) {
    console.log("in addContact at top");

    if (!this.contact.imageName) {
      this.contact.imageName = 'placeholder_100.jpg';
      console.log("in placeholder if");
    }

    console.log("after placeholder if");

    this.contactService.add(this.contact).subscribe(
      (res: Contact) => {
        this.success = 'Succesfully created';

        console.log("in contactService.add subscribe");

        this.router.navigate(['/contacts']);

      },
      (err) => {
        this.error = err.error?.message || err.message || 'Error Occured';

      }
    )

  }

}
