import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Router, RouterLink, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-updatecontacts',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './updatecontacts.component.html',
  styleUrl: './updatecontacts.component.css',
  providers: [ContactService]
})
export class UpdatecontactsComponent implements OnInit {

  contactID: number=0;
  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', dob:'' };

  error = '';
  success = '';
  maxDate: string = '';

  constructor(
    private contactService: ContactService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    this.maxDate = `${yyyy}-${mm}-${dd}`;

    this.contactID = +this.route.snapshot.paramMap.get('id')!;

    this.contactService.get(this.contactID).subscribe({
      next: (data: Contact) => {
        this.contact = data;
      },
      error: () => this.error = 'Error loading contact'
    });
  }

  updateContact(form: NgForm)
  {
    console.log("inside updateContact at top")
    //Prepare form data
    const formData = new FormData();
    formData.append('contactID', this.contactID.toString());
    formData.append('firstName', this.contact.firstName || '');
    formData.append('lastName', this.contact.lastName || '');
    formData.append('emailAddress', this.contact.emailAddress || '');
    formData.append('phoneNumber', this.contact.phoneNumber || '');
    formData.append('dob', this.contact.dob || '');

    console.log(this.contact.phoneNumber);


    // // Send the request to update.php
    // this.http.post('http://localhost/contactapi2026am/update.php', formData).subscribe({
    //   next: () => {
    //     this.success = 'Contact updated successfully.';
    //     this.router.navigate(['/contacts']);
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     if (err.status == 409) {
    //       this.error = err.error?.error || 'Duplicate entry detected.';
    //     }
    //     else {
    //       this.error = 'Update failed.';
    //     }
    //   }
    // });
    this.http.post('http://localhost/contactapi2026am/update.php', formData).subscribe({
    next: (response) => {
        console.log('UPDATE SUCCESS:', response);
        this.success = 'Contact updated successfully.';
        this.router.navigate(['/contacts']);
    },
    error: (err: HttpErrorResponse) => {
        console.log('UPDATE ERROR:', err);
        console.log('HTTP STATUS:', err.status);
        console.log('ERROR BODY:', err.error);

        if (err.status == 409) {
            this.error = err.error?.error || 'Duplicate entry detected.';
        }
        else {
            this.error = 'Update failed.';
        }
    }
  });
  }
  

}
