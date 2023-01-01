import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NewMailComponent } from './ComponentsToShow/new-mail/new-mail.component';
import { ViewMailComponent } from './ComponentsToShow/view-mail/view-mail.component';
import { LoginComponent } from './login/login.component';
import { MailPageComponent } from './mail-page/mail-page.component';
import { MailPageRouteGaurdService } from './services/mail-page-route-gaurd.service';
import { SignupComponent } from './signup/signup.component';
import { ContactsComponent } from './ComponentsToShow/contacts/contacts.component';
import { FolderComponent } from './folder/folder.component';


const appRoute: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'mail-page',
    component: MailPageComponent,canActivate:[MailPageRouteGaurdService],
    children: [
      { path: '', component: NewMailComponent, outlet: 'main' },
      { path: 'contacts', component: ContactsComponent, outlet: 'main' },
      { path: 'folder', component: FolderComponent, outlet: 'main' },
      { path: 'new-mail', component: NewMailComponent, outlet: 'main' },
      { path: 'sentemails/:id', component: ViewMailComponent, outlet: 'main' },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppRouting { }