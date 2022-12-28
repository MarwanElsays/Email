import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { InboxComponent } from './ComponentsToShow/inbox/inbox.component';
import { SentComponent } from './ComponentsToShow/sent/sent.component';
import { TrashComponent } from './ComponentsToShow/trash/trash.component';
import { DraftComponent } from './ComponentsToShow/Draft/draft.component';
import { NewMailComponent } from './ComponentsToShow/new-mail/new-mail.component';
import { ViewMailComponent } from './ComponentsToShow/view-mail/view-mail.component';
import { LoginComponent } from './login/login.component';
import { MailPageComponent } from './mail-page/mail-page.component';
import { MailPageRouteGaurdService } from './services/mail-page-route-gaurd.service';


const appRoute: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'mail-page',
    component: MailPageComponent,canActivate:[MailPageRouteGaurdService],
    children: [
      { path: 'inbox', component: InboxComponent, outlet: 'main' },
      { path: 'sent', component: SentComponent, outlet: 'main' },
      { path: 'trash', component: TrashComponent, outlet: 'main' },
      { path: 'draft', component: DraftComponent, outlet: 'main' },
      { path: 'new-mail', component: NewMailComponent, outlet: 'main' },
      { path: 'sentemails/:root/:id', component: ViewMailComponent, outlet: 'main' },
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