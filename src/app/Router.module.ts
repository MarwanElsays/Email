import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './ComponentsToShow/HomePage/Home.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';
import { DraftComponent } from './ComponentsToShow/Draft/draft.component';
import { NewMailComponent } from './ComponentsToShow/new-mail/new-mail.component';
import { SentEmailsComponent } from './ComponentsToShow/sent/sent-emails/sent-emails.component';


const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Inbox', component: InboxComponent },
  { path: 'Sent', component: SentComponent },
  { path: 'Trash', component: TrashComponent },
  { path: 'draft', component: DraftComponent },
  { path: 'new-mail', component: NewMailComponent },
  { path: 'Sent' ,children:[
    {path: 'sentemails/:id',component:SentEmailsComponent}
  ]},
  {path: 'Trash' ,children:[
    {path: 'sentemails/:id',component:SentEmailsComponent}
  ]},
  {path: 'draft' ,children:[
    {path: 'sentemails/:id',component:SentEmailsComponent}
  ]}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppRouting { }