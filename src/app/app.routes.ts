import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { AddcontactsComponent } from './addcontacts/addcontacts.component';
import { UpdatecontactsComponent } from './updatecontacts/updatecontacts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: "contacts", component: ContactsComponent, canActivate: [authGuard] },
    { path: "add", component: AddcontactsComponent, canActivate: [authGuard] },
    { path: "update/:id", component: UpdatecontactsComponent, canActivate: [authGuard] },
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent },
    { path: "**", redirectTo: "/contacts", pathMatch: "full" }
    
];
