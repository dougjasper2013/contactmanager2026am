import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcontacts',
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [ContactService],
  templateUrl: './addcontacts.component.html',
  styleUrl: './addcontacts.component.css'
})
export class AddcontactsComponent implements OnInit {

  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', dob:'', imageName:'' };

  selectedFile: File | null = null;
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

        if (this.selectedFile && this.contact.imageName != 'placeholder_100.jpg')
        {
          this.uploadFile();
        }

        f.reset();

        this.router.navigate(['/contacts']);

      },
      (err) => {
        this.error = err.error?.message || err.message || 'Error Occured';

      }
    )

  }

  onFileSelected(event: Event): void {
    console.log("in onFileSelected");
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0)
    {
        console.log("in if block in onFileSelected");
        this.selectedFile = input.files[0];
        this.contact.imageName = this.selectedFile.name;
    }
    console.log("after if block in onFileSelected");
  }

  uploadFile(): void {
    console.log("before if block in uploadFile");
    if (!this.selectedFile) {
      console.log("in if block in uploadFile");
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost/contactapi2026am/upload', formData).subscribe(
      response => console.log('File uploaded successfuly:', response),
      error => console.error('File upload failed:', error)
    );
  }

}
