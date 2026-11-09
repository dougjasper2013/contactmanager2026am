import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
    { path: "contacts", component: ContactsComponent },
    { path: "**", redirectTo: "/contacts", pathMatch: "full" }
    
];

// import { Routes } from '@angular/router';

// import { ContactsComponent } from './contacts/contacts.component';

// export const routes: Routes = [
//     { path: "contacts", component: ContactsComponent }
// ];

// import { Routes } from '@angular/router';

// export const routes: Routes = [
//     {
//         path: 'contacts',
//         loadComponent: () =>
//             import('./contacts/contacts.component')
//                 .then(m => m.ContactsComponent)
//     }
// ];